
using FluentValidation.AspNetCore;
using MentorPlatform.Application.Extensions;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Infrastructure.Extensions;
using MentorPlatform.Persistence;
using MentorPlatform.Persistence.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MentorPlatform.WebApi.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureEntireLayers(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
        services.ConfigureApplicationLayer()
            .ConfigurePersistenceLayer(config)
            .ConfigureInfrastructureLayer();
        return services;
    }

    public static async Task InitializeDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.MigrateAsync().GetAwaiter().GetResult();
        await SeedDataAsync(context);
    }

    private static async Task SeedDataAsync(ApplicationDbContext context)
    {
        await SeedUserDataAsync(context);
        await SeedCourseCategoryDataAsync(context);
        await SeedExpertiseDataAsync(context);
        await SeedCourseDataAsync(context);
    }
    private static async Task SeedUserDataAsync(ApplicationDbContext context)
    {
        if (!await context.Users.AnyAsync())
        {
            var users = new List<User>
            {
                new()
                {
                    Role = (int)Role.Admin, IsVerifyEmail = true, Email = "admin@mentor.com", Password = HashingHelper.HashData("admin123A@"),
                    UserDetail = new()
                    {
                        FullName = "Admin Vipro Luxyry",
                        CommunicationPreference = 0,
                        Duration = 45,
                        SessionFrequency = 0
                    }
                },
                new()
                {
                    Role = (int)Role.Admin, IsVerifyEmail = true, Email = "thanh.hung.st302@gmail.com", Password = HashingHelper.HashData("Password@123"),
                    UserDetail = new()
                    {
                        FullName = "Nguyen Thanh Hung",
                        CommunicationPreference = 0,
                        Duration = 45,
                        SessionFrequency = 0
                    }
                }
            };

            context.AddRange(users);
            await context.SaveChangesAsync();
        }
        if (await context.Users.CountAsync() < 20)
        {
            var userSeedingList = new List<User> {

        new() {
                    Role = (Role) 2,
                    Email = "bheiton0@bloglovin.com",
                    Password = HashingHelper.HashData("pX8*o{Bk`Q`"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = false,
                    LastActive = DateTime.Parse("2024-08-09T18:06:51Z"),
                    UserDetail = new()
                    {
                        FullName = "Luce Smeal",
                        Bio = "I am Luce Smeal. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/131x357.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "Islamic Finance",
                        Goals = "VP Marketing",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 2,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 1,
                    Email = "npirrie1@hugedomains.com",
                    Password = HashingHelper.HashData("qS5\t!+(@b~o)cU"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = false,
                    LastActive = DateTime.Parse("2024-09-10T07:46:57Z"),
                    UserDetail = new()
                    {
                        FullName = "Haleigh Cheltnam",
                        Bio = "I am Haleigh Cheltnam. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/122x212.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Type 2 Diabetes",
                        Goals = "Administrative Officer",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "cfieldstone2@statcounter.com",
                    Password = HashingHelper.HashData("zY5%G(MY"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = true,
                    IsActive = false,
                    LastActive = DateTime.Parse("2024-10-11T12:16:20Z"),
                    UserDetail = new()
                    {
                        FullName = "Aksel Renowden",
                        Bio = "I am Aksel Renowden. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/194x383.png/5fa2dd/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Eye Surgery",
                        Goals = "Paralegal",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "bfludgate3@va.gov",
                    Password = HashingHelper.HashData("dW7%#iDP_lrqpAvr"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-10-12T11:43:29Z"),
                    UserDetail = new()
                    {
                        FullName = "Lindy Aldwinckle",
                        Bio = "I am Lindy Aldwinckle. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/219x399.png/dddddd/000000",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 0,
                        ProfessionalSkill = "ZigBee",
                        Goals = "Administrative Assistant II",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 1,
                    Email = "echell4@gov.uk",
                    Password = HashingHelper.HashData("xT6|VEWg8bXk}pZH"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-08-12T12:08:06Z"),
                    UserDetail = new()
                    {
                        FullName = "Annadiane Ilyas",
                        Bio = "I am Annadiane Ilyas. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/194x304.png/dddddd/000000",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Slide Shows",
                        Goals = "Occupational Therapist",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "mfilan5@drupal.org",
                    Password = HashingHelper.HashData("qD7(96_?+@0J%2s"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-02-21T23:27:30Z"),
                    UserDetail = new()
                    {
                        FullName = "Vania Plaschke",
                        Bio = "I am Vania Plaschke. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/218x124.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "Oil &amp; Gas Accounting",
                        Goals = "Sales Associate",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency) 0,
                        LearningStyle = (LearningStyle) 3
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "bmaulkin6@reverbnation.com",
                    Password = HashingHelper.HashData("eQ0|.~</di$2"),
                    IsNotification = true,
                    IsPrivateProfile = true,
                    IsVerifyEmail = false,
                    IsActive = false,
                    LastActive = DateTime.Parse("2025-03-26T01:46:26Z"),
                    UserDetail = new()
                    {
                        FullName = "Emelyne Shankster",
                        Bio = "I am Emelyne Shankster. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/110x371.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Newspapers",
                        Goals = "Legal Assistant",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 1,
                    Email = "abeacham7@diigo.com",
                    Password = HashingHelper.HashData("qJ9%jd`/8R'`*KR"),
                    IsNotification = false,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-09-04T14:50:12Z"),
                    UserDetail = new()
                    {
                        FullName = "Corrianne Getcliffe",
                        Bio = "I am Corrianne Getcliffe. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/172x391.png/5fa2dd/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "HDPE",
                        Goals = "Legal Assistant",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "cbattill8@blogspot.com",
                    Password = HashingHelper.HashData("aZ9{Vtjx"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-07-01T04:34:26Z"),
                    UserDetail = new()
                    {
                        FullName = "Cinderella Maraga",
                        Bio = "I am Cinderella Maraga. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/240x226.png/dddddd/000000",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 0,
                        ProfessionalSkill = "Driving License",
                        Goals = "Marketing Manager",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 1,
                    Email = "mwalkington9@uiuc.edu",
                    Password = HashingHelper.HashData("pD1<6T6>|1m<Zh"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-03-08T00:57:09Z"),
                    UserDetail = new()
                    {
                        FullName = "Tallia Bursnell",
                        Bio = "I am Tallia Bursnell. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/187x166.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "Blender",
                        Goals = "Senior Editor",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "jbrixhama@jimdo.com",
                    Password = HashingHelper.HashData("yM0*gH8Z*H"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-06-13T18:08:36Z"),
                    UserDetail = new()
                    {
                        FullName = "Elsworth Blackburne",
                        Bio = "I am Elsworth Blackburne. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/213x261.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "Market Knowledge",
                        Goals = "Research Assistant III",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 2
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "zankersb@is.gd",
                    Password = HashingHelper.HashData("zQ6$v)cWA>>E"),
                    IsNotification = false,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = false,
                    LastActive = DateTime.Parse("2024-06-21T11:24:08Z"),
                    UserDetail = new()
                    {
                        FullName = "Dodie Hansard",
                        Bio = "I am Dodie Hansard. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/172x330.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "IV",
                        Goals = "Web Designer III",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 0
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "mmichiec@jimdo.com",
                    Password = HashingHelper.HashData("tH3\tVbD6#7G`"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-06-16T16:42:33Z"),
                    UserDetail = new()
                    {
                        FullName = "Leopold Jephcote",
                        Bio = "I am Leopold Jephcote. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/217x108.png/5fa2dd/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 0,
                        ProfessionalSkill = "Teeth Whitening",
                        Goals = "Automation Specialist III",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 0
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "bwitheridged@ucla.edu",
                    Password = HashingHelper.HashData("cO1|6*L$7B0<N`"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-07-19T02:28:27Z"),
                    UserDetail = new()
                    {
                        FullName = "Fayette Whyard",
                        Bio = "I am Fayette Whyard. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/198x129.png/dddddd/000000",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "RMADS",
                        Goals = "Research Assistant III",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "aclayworthe@tiny.cc",
                    Password = HashingHelper.HashData("uK3_mnf3RbOt"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-05-12T10:36:52Z"),
                    UserDetail = new()
                    {
                        FullName = "Merrili Burnhams",
                        Bio = "I am Merrili Burnhams. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/154x378.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "WPS",
                        Goals = "Staff Scientist",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "rdevonportf@ameblo.jp",
                    Password = HashingHelper.HashData("rO0'|}Z92mbxtSIS"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-04-12T08:35:41Z"),
                    UserDetail = new()
                    {
                        FullName = "Yetta Antonich",
                        Bio = "I am Yetta Antonich. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/241x182.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 0,
                        ProfessionalSkill = "Claims Handling",
                        Goals = "Community Outreach Specialist",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency) 3,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "acayzerg@miitbeian.gov.cn",
                    Password = HashingHelper.HashData("bY2!=)2@~(GJ"),
                    IsNotification = true,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = false,
                    LastActive = DateTime.Parse("2024-07-17T14:08:43Z"),
                    UserDetail = new()
                    {
                        FullName = "Shel Hallgalley",
                        Bio = "I am Shel Hallgalley. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/240x368.png/5fa2dd/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Olive Oil",
                        Goals = "Pharmacist",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency) 2,
                        LearningStyle = (LearningStyle) 1
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "ccobelloh@hibu.com",
                    Password = HashingHelper.HashData("sQ6<.i07j>"),
                    IsNotification = true,
                    IsPrivateProfile = false,
                    IsVerifyEmail = true,
                    IsActive = false,
                    LastActive = DateTime.Parse("2025-03-26T20:15:33Z"),
                    UserDetail = new()
                    {
                        FullName = "Chery Beeck",
                        Bio = "I am Chery Beeck. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/207x248.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 2,
                        ProfessionalSkill = "zLinux",
                        Goals = "Product Engineer",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 0
                    }
                },
        new() {
                    Role = (Role) 2,
                    Email = "bbrownseyi@house.gov",
                    Password = HashingHelper.HashData("tM9dS!dKQdA<q"),
                    IsNotification = false,
                    IsPrivateProfile = false,
                    IsVerifyEmail = false,
                    IsActive = true,
                    LastActive = DateTime.Parse("2024-05-19T12:12:19Z"),
                    UserDetail = new()
                    {
                        FullName = "Shelby Simper",
                        Bio = "I am Shelby Simper. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/205x352.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Lynx",
                        Goals = "Programmer Analyst II",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 0
                    }
                },
        new() {
                    Role = (Role) 0,
                    Email = "etombsj@youku.com",
                    Password = HashingHelper.HashData("aP6$Ggj}'M/P"),
                    IsNotification = false,
                    IsPrivateProfile = false,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-02-18T01:05:44Z"),
                    UserDetail = new()
                    {
                        FullName = "Eadith Barcroft",
                        Bio = "I am Eadith Barcroft. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/244x175.png/cc0000/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference) 1,
                        ProfessionalSkill = "Zinc",
                        Goals = "Quality Engineer",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency) 1,
                        LearningStyle = (LearningStyle) 3
                    }
                }
                    };

            context.AddRange(userSeedingList);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedExpertiseDataAsync(ApplicationDbContext context)
    {
        var tm = await context.Expertises.ToListAsync();
        if (!await context.Expertises.AnyAsync())
        {
            var expertiseList = new List<Expertise>
            {
                new Expertise
                {
                    Id   = Guid.Parse("8a5bc300-21c4-47d0-bb33-27d0a709d417"),
                    Name = "Leadership"
                },
                new Expertise
                {
                    Id   = Guid.Parse("620c3297-5e96-4bcb-b36b-edc5d98b7b58"),
                    Name = "Programming"
                },
                new Expertise
                {
                    Id   = Guid.Parse("365d9e94-51fc-4840-acfe-7f1432007c29"),
                    Name = "Design"
                },
                new Expertise
                {
                    Id   = Guid.Parse("60bccb3d-07b8-44a1-9e37-b7b59ab398a5"),
                    Name = "Marketing"
                },
                new Expertise
                {
                    Id   = Guid.Parse("2e964bad-792a-46ee-970b-735faf949883"),
                    Name = "Data Science"
                },
                new Expertise
                {
                    Id   = Guid.Parse("1ea0f096-dbda-491d-8b68-cdcf92487bd3"),
                    Name = "Business"
                },
                new Expertise
                {
                    Id   = Guid.Parse("53a6749e-770d-48a9-aa13-8c398699838e"),
                    Name = "Project Management"
                },
                new Expertise
                {
                    Id   = Guid.Parse("d2a21f3c-5286-4e2a-a8af-bcf1004b79b3"),
                    Name = "Communication"
                }
            };
            context.Expertises.AddRange(expertiseList);
            await context.SaveChangesAsync();
        }
    }
    private static async Task SeedCourseCategoryDataAsync(ApplicationDbContext context)
    {
        if (!await context.CourseCategories.AnyAsync())
        {
            var courseCategories = new List<CourseCategory>
            {
                new()
                {
                    Id = Guid.Parse("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
                    Name = "Software Development",
                    Description = "Courses related to programming, software engineering, and development practices.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("9c9f1e7a-3a3b-4d6d-9f0c-1a2b3c4d5e6f"),
                    Name = "Data Science",
                    Description = "Courses covering data analysis, machine learning, and AI.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    Name = "Business & Management",
                    Description = "Courses on business strategy, management, and entrepreneurship.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("2d5f7e8a-9b1c-4d2e-a3f4-5b6c7d8e9f0a"),
                    Name = "Design & Creativity",
                    Description = "Courses in graphic design, UI/UX, and creative arts.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"),
                    Name = "Marketing",
                    Description = "Courses on digital marketing, branding, and sales.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("0f1e2d3c-4b5a-6c7d-8e9f-0a1b2c3d4e5f"),
                    Name = "Personal Development",
                    Description = "Courses for self-improvement, productivity, and soft skills.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("abcdef01-2345-6789-abcd-ef0123456789"),
                    Name = "Finance & Accounting",
                    Description = "Courses on financial literacy, accounting, and investment.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("12345678-9abc-def0-1234-56789abcdef0"),
                    Name = "Language Learning",
                    Description = "Courses for learning new languages and improving communication.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("fedcba98-7654-3210-fedc-ba9876543210"),
                    Name = "Health & Wellness",
                    Description = "Courses on physical health, mental wellness, and nutrition.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("11223344-5566-7788-99aa-bbccddeeff00"),
                    Name = "Engineering",
                    Description = "Courses in various engineering disciplines and applied sciences.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("00ffeedd-ccbb-aabb-8899-776655443322"),
                    Name = "Education & Teaching",
                    Description = "Courses for educators and those interested in teaching.",
                    IsActive = true
                },
                new()
                {
                    Id = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                    Name = "Information Technology",
                    Description = "Courses on IT infrastructure, networking, and cybersecurity.",
                    IsActive = true
                }
            };

            context.AddRange(courseCategories);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedCourseDataAsync(ApplicationDbContext context)
    {
        if (!await context.Courses.AnyAsync())
        {
            var categories = await context.CourseCategories.ToListAsync();
            var courses = new List<Course>();
            foreach (var category in categories)
            {
                for (int i = 1; i <= 10; i++)
                {
                    courses.Add(new Course
                    {
                        Title = $"{category.Name} Course {i}",
                        Description = $"This is {category.Name} Course {i} description.",
                        Level = i % 3 + 1,
                        CourseCategoryId = category.Id,
                        IsDeleted = false
                    });
                }
            }
            context.Courses.AddRange(courses);
            await context.SaveChangesAsync();
        }
    }
}
