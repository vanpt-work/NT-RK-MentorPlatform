using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;

namespace MentorPlatform.WebApi.ModelBinders;
public class CustomStringModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null) throw new ArgumentNullException(nameof(bindingContext));

        var valueResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        if (valueResult == ValueProviderResult.None)
            return Task.CompletedTask;

        var value = valueResult.FirstValue;
        bindingContext.Result = ModelBindingResult.Success(value?.Trim());
        return Task.CompletedTask;
    }
}
public class TrimmingModelBinder : IModelBinder
{
    private readonly Dictionary<ModelMetadata, IModelBinder> _propertyBinders;
    public TrimmingModelBinder(Dictionary<ModelMetadata, IModelBinder> propertyBinders)
    {
        _propertyBinders = propertyBinders;
    }

    public async Task BindModelAsync(ModelBindingContext bindingContext)
    {
        foreach (var entry in _propertyBinders)
        {
            var propertyMetadata = entry.Key;
            var binder = entry.Value;

            var modelName = ModelNames.CreatePropertyModelName(bindingContext.ModelName, propertyMetadata.PropertyName);

            var propertyBindingContext = DefaultModelBindingContext.CreateBindingContext(
                bindingContext.ActionContext,
                bindingContext.ValueProvider,
                propertyMetadata,
                bindingInfo: null,
                modelName
            );

            await binder.BindModelAsync(propertyBindingContext);

            var resultModel = bindingContext.Result.Model;
            if (propertyBindingContext.Result.IsModelSet)
            {
                propertyMetadata.PropertySetter(resultModel, propertyBindingContext.Result.Model);
            }
        }

        if (!bindingContext.Result.IsModelSet || bindingContext.Result.Model == null)
            return;

        var model = bindingContext.Result.Model;
        TrimAllStrings(model);
        bindingContext.Result = ModelBindingResult.Success(model);
    }

    private void TrimAllStrings(object obj)
    {
        var type = obj.GetType();

        foreach (var prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                     .Where(p => p.CanRead && p.CanWrite && p.PropertyType == typeof(string)))
        {
            var s = prop.GetValue(obj)?.ToString();
            if (s != null)
                prop.SetValue(obj, s.Trim());
        }

        foreach (var prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                     .Where(p => p.CanRead && p.PropertyType.IsClass && p.PropertyType != typeof(string)))
        {
            var nested = prop.GetValue(obj);
            if (nested == null) continue;

            if (nested is IEnumerable enumerable)
            {
                foreach (var item in enumerable)
                    TrimAllStrings(item);
            }
            else
            {
                TrimAllStrings(nested);
            }
        }
    }
}

public class TrimmingModelBinderProvider : IModelBinderProvider
{
    public IModelBinder? GetBinder(ModelBinderProviderContext context)
    {
        if (context.Metadata.ModelType == typeof(string))
        {
            return new CustomStringModelBinder();
        }

        if (context.Metadata.IsComplexType)
        {
            var propertyBinders = new Dictionary<ModelMetadata, IModelBinder>();

            foreach (var property in context.Metadata.Properties)
            {
                var binder = context.CreateBinder(property);
                if (binder != null)
                {
                    propertyBinders[property] = binder;
                }
            }

            return new TrimmingModelBinder(propertyBinders);
        }

        return null;
    }
}

