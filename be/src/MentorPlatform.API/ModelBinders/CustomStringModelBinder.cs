using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Collections;
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
    private readonly IModelBinder _innerBinder;

    public TrimmingModelBinder(IModelBinder innerBinder)
        => _innerBinder = innerBinder;

    public async Task BindModelAsync(ModelBindingContext bindingContext)
    {
        await _innerBinder.BindModelAsync(bindingContext);
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
    public IModelBinder GetBinder(ModelBinderProviderContext context)
    {
        if (context == null)
            throw new ArgumentNullException(nameof(context));

        if (context.Metadata.ModelType == typeof(string))
        {
            return new CustomStringModelBinder();
        }

        if (context.Metadata.IsComplexType || context.Metadata.IsCollectionType)
        {
            var propertyBinders = new Dictionary<ModelMetadata, IModelBinder>();
            foreach (var property in context.Metadata.Properties)
            {
                var binder = context.CreateBinder(property);
                propertyBinders[property] = binder;
            }

            IModelBinder innerBinder;
            if (context.Metadata.IsCollectionType)
            {
                var elementMetadata = context.Metadata.ElementMetadata;
                if (elementMetadata == null)
                {
                    return null;
                }

                var elementBinder = context.CreateBinder(elementMetadata);
                var loggerFactory = context.Services.GetRequiredService<ILoggerFactory>();

                var collectionModelBinderType = typeof(CollectionModelBinder<>).MakeGenericType(elementMetadata.ModelType);
                innerBinder = (IModelBinder)Activator.CreateInstance(collectionModelBinderType, elementBinder, loggerFactory);
            }
            else
            {
                innerBinder = new ComplexTypeModelBinder(propertyBinders, context.Services.GetRequiredService<ILoggerFactory>());
            }

            return new TrimmingModelBinder(innerBinder);
        }

        return null;
    }
}