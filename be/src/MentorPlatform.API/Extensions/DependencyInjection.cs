
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
        await SeedCourseResourseDataAsync(context);
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
            var userSeedingList = new List<User>
            {
                new User
                {
                    Id = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "Islamic Finance",
                        Goals = "VP Marketing",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)2,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Role = (Role)1,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Type 2 Diabetes",
                        Goals = "Administrative Officer",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("c3d4e5f6-7890-1234-cdef-345678901234"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Eye Surgery",
                        Goals = "Paralegal",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("d4e5f6a7-8901-2345-def0-456789012345"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)0,
                        ProfessionalSkill = "ZigBee",
                        Goals = "Administrative Assistant II",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Role = (Role)1,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Slide Shows",
                        Goals = "Occupational Therapist",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("f6a7b8c9-0123-4567-f012-678901234567"),
                    Role = (Role)0,
                    Email = "mfilan5@drupal.org",
                    Password = HashingHelper.HashData("qD7(96_?+@0J%2s"),
                    IsNotification = false,
                    IsPrivateProfile = true,
                    IsVerifyEmail = true,
                    IsActive = true,
                    LastActive = DateTime.Parse("2025-02-21T23:27:30Z"),
                    UserDetail = new()
                    {
                        UserId = Guid.Parse("f6a7b8c9-0123-4567-f012-678901234567"),
                        FullName = "Vania Plaschke",
                        Bio = "I am Vania Plaschke. Highly motivated and creative graphic designer with 2 years of experience. Proven ability to develop compelling visual concepts, translate brand identity into engaging designs, and deliver projects on time and within budget. Proficient in Adobe Creative Suite and skilled in various design principles",
                        AvatarUrl = "http://dummyimage.com/218x124.png/ff4444/ffffff",
                        Experience = "Collaborated with clients to understand their design needs and developed creative solutions",
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "Oil & Gas Accounting",
                        Goals = "Sales Associate",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency)0,
                        LearningStyle = (LearningStyle)3
                    }
                },
                new User
                {
                    Id = Guid.Parse("a7b8c9d0-1234-5678-0123-789012345678"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Newspapers",
                        Goals = "Legal Assistant",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Role = (Role)1,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "HDPE",
                        Goals = "Legal Assistant",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("c9d0e1f2-3456-7890-2345-901234567890"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)0,
                        ProfessionalSkill = "Driving License",
                        Goals = "Marketing Manager",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Role = (Role)1,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "Blender",
                        Goals = "Senior Editor",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("e1f2a3b4-5678-9012-4567-123456789012"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "Market Knowledge",
                        Goals = "Research Assistant III",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)2
                    }
                },
                new User
                {
                    Id = Guid.Parse("f2a3b4c5-6789-0123-5678-234567890123"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "IV",
                        Goals = "Web Designer III",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)0
                    }
                },
                new User
                {
                    Id = Guid.Parse("a3b4c5d6-7890-1234-6789-345678901234"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)0,
                        ProfessionalSkill = "Teeth Whitening",
                        Goals = "Automation Specialist III",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)0
                    }
                },
                new User
                {
                    Id = Guid.Parse("b4c5d6e7-8901-2345-7890-456789012345"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "RMADS",
                        Goals = "Research Assistant III",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("c5d6e7f8-9012-3456-8901-567890123456"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "WPS",
                        Goals = "Staff Scientist",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("d6e7f8a9-0123-4567-9012-678901234567"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)0,
                        ProfessionalSkill = "Claims Handling",
                        Goals = "Community Outreach Specialist",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency)3,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("e7f8a9b0-1234-5678-0123-789012345678"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Olive Oil",
                        Goals = "Pharmacist",
                        Duration = 15,
                        SessionFrequency = (SessionFrequency)2,
                        LearningStyle = (LearningStyle)1
                    }
                },
                new User
                {
                    Id = Guid.Parse("f8a9b0c1-2345-6789-1234-890123456789"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)2,
                        ProfessionalSkill = "zLinux",
                        Goals = "Product Engineer",
                        Duration = 30,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)0
                    }
                },
                new User
                {
                    Id = Guid.Parse("a9b0c1d2-3456-7890-2345-901234567890"),
                    Role = (Role)2,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Lynx",
                        Goals = "Programmer Analyst II",
                        Duration = 60,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)0
                    }
                },
                new User
                {
                    Id = Guid.Parse("b0c1d2e3-4567-8901-3456-012345678901"),
                    Role = (Role)0,
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
                        CommunicationPreference = (CommunicationPreference)1,
                        ProfessionalSkill = "Zinc",
                        Goals = "Quality Engineer",
                        Duration = 45,
                        SessionFrequency = (SessionFrequency)1,
                        LearningStyle = (LearningStyle)3
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

    private static async Task SeedCourseResourseDataAsync(ApplicationDbContext context)
    {
        if (!await context.CourseResources.AnyAsync())
        {
            var courseResources = new List<CourseResource>
            {
                new CourseResource
                {
                    Id = Guid.Parse("b1c2d3e4-a5b6-7890-1234-56789abcdef2"),
                    CourseId = Guid.Parse("1a2b3c4d-5e6f-7890-1234-56789abcdef0"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/csharp-basics-guide.pdf",
                    Title = "C# Programming Guide",
                    Description = "A detailed guide to C# syntax and object-oriented programming concepts.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("c2d3e4f5-b6c7-8901-2345-6789abcdef23"),
                    CourseId = Guid.Parse("2b3c4d5e-6f7a-8901-2345-6789abcdef01"),
                    FileType = "Video",
                    FilePath = "https://storage.example.com/courses/ml-techniques.mp4",
                    Title = "Machine Learning Tutorial",
                    Description = "Video tutorial covering advanced machine learning algorithms.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("d3e4f5a6-c7d8-9012-3456-789abcdef234"),
                    CourseId = Guid.Parse("3c4d5e6f-7a8b-9012-3456-789abcdef012"),
                    FileType = "Document",
                    FilePath = "https://storage.example.com/courses/business-plan-template.docx",
                    Title = "Business Plan Template",
                    Description = "Template for creating strategic business plans.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("e4f5a6b7-d8e9-0123-4567-89abcdef2345"),
                    CourseId = Guid.Parse("4d5e6f7a-8b9c-0123-4567-89abcdef0123"),
                    FileType = "Image",
                    FilePath = "https://storage.example.com/courses/uiux-mockup.png",
                    Title = "UI/UX Mockup Example",
                    Description = "Sample mockup for designing user-friendly interfaces.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("f5a6b7c8-e9f0-1234-5678-9abcdef23456"),
                    CourseId = Guid.Parse("5e6f7a8b-9c0d-1234-5678-9abcdef01234"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/seo-strategies.pdf",
                    Title = "SEO Strategies",
                    Description = "Guide to effective search engine optimization techniques.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("a6b7c8d9-f0a1-2345-6789-abcdef234567"),
                    CourseId = Guid.Parse("6f7a8b9c-0d1e-2345-6789-abcdef012345"),
                    FileType = "Video",
                    FilePath = "https://storage.example.com/courses/time-management-tips.mp4",
                    Title = "Time Management Tips",
                    Description = "Video on improving personal productivity techniques.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("b7c8d9e0-a1b2-3456-7890-bcdef2345678"),
                    CourseId = Guid.Parse("7a8b9c0d-1e2f-3456-7890-bcdef0123456"),
                    FileType = "Document",
                    FilePath = "https://storage.example.com/courses/budget-template.xlsx",
                    Title = "Personal Budget Template",
                    Description = "Spreadsheet for managing personal finances.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("c8d9e0f1-b2c3-4567-8901-cdef23456789"),
                    CourseId = Guid.Parse("8b9c0d1e-2f3a-4567-8901-cdef01234567"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/french-phrases.pdf",
                    Title = "French Common Phrases",
                    Description = "List of common French phrases for beginner learners.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("d9e0f1a2-c3d4-5678-9012-def234567890"),
                    CourseId = Guid.Parse("9c0d1e2f-3a4b-5678-9012-def012345678"),
                    FileType = "Video",
                    FilePath = "https://storage.example.com/courses/mindfulness-exercises.mp4",
                    Title = "Mindfulness Exercises",
                    Description = "Guided video for mindfulness meditation practices.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("e0f1a2b3-d4e5-6789-0123-ef2345678901"),
                    CourseId = Guid.Parse("0d1e2f3a-4b5c-6789-0123-ef0123456789"),
                    FileType = "Document",
                    FilePath = "https://storage.example.com/courses/civil-engineering-overview.docx",
                    Title = "Civil Engineering Overview",
                    Description = "Introduction to key civil engineering principles.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("f1a2b3c4-e5f6-7890-1234-f0234567890a"),
                    CourseId = Guid.Parse("1e2f3a4b-5c6d-7890-1234-f0123456789a"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/classroom-techniques.pdf",
                    Title = "Classroom Techniques",
                    Description = "Guide to effective classroom management strategies.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("a2b3c4d5-f6a7-8901-2345-0123456789ab"),
                    CourseId = Guid.Parse("2f3a4b5c-6d7e-8901-2345-0123456789ab"),
                    FileType = "Video",
                    FilePath = "https://storage.example.com/courses/network-security-basics.mp4",
                    Title = "Network Security Basics",
                    Description = "Video tutorial on securing computer networks.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("b3c4d5e6-a7b8-9012-3456-123456789abc"),
                    CourseId = Guid.Parse("3a4b5c6d-7e8f-9012-3456-123456789abc"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/javascript-reference.pdf",
                    Title = "JavaScript Reference",
                    Description = "Quick reference guide for JavaScript programming concepts.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("c4d5e6f7-b8c9-0123-4567-23456789abcd"),
                    CourseId = Guid.Parse("4b5c6d7e-8f9a-0123-4567-23456789abcd"),
                    FileType = "Document",
                    FilePath = "https://storage.example.com/courses/pandas-quick-guide.docx",
                    Title = "Pandas Quick Guide",
                    Description = "Guide to using Python's Pandas library for data analysis.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("d5e6f7a8-c9d0-1234-5678-3456789abcde"),
                    CourseId = Guid.Parse("5c6d7e8f-9a0b-1234-5678-3456789abcde"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/entrepreneurship-tips.pdf",
                    Title = "Entrepreneurship Tips",
                    Description = "Tips for starting and growing a successful business.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("e6f7a8b9-d0e1-2345-6789-456789abcdef"),
                    CourseId = Guid.Parse("6d7e8f9a-0b1c-2345-6789-456789abcdef"),
                    FileType = "Image",
                    FilePath = "https://storage.example.com/courses/photoshop-tools-guide.png",
                    Title = "Photoshop Tools Guide",
                    Description = "Visual guide to Photoshop tools and techniques.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("f7a8b9c0-e1f2-3456-7890-56789abcdef0"),
                    CourseId = Guid.Parse("7e8f9a0b-1c2d-3456-7890-56789abcdef0"),
                    FileType = "Video",
                    FilePath = "https://storage.example.com/courses/content-strategy-tutorial.mp4",
                    Title = "Content Strategy Tutorial",
                    Description = "Video on developing effective content marketing strategies.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("a8b9c0d1-f2a3-4567-8901-6789abcdef01"),
                    CourseId = Guid.Parse("8f9a0b1c-2d3e-4567-8901-6789abcdef01"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/public-speaking-tips.pdf",
                    Title = "Public Speaking Tips",
                    Description = "Guide to effective public speaking techniques.",
                    IsDeleted = true
                },
                new CourseResource
                {
                    Id = Guid.Parse("b9c0d1e2-a3b4-5678-9012-789abcdef012"),
                    CourseId = Guid.Parse("9a0b1c2d-3e4f-5678-9012-789abcdef012"),
                    FileType = "Document",
                    FilePath = "https://storage.example.com/courses/accounting-principles.docx",
                    Title = "Accounting Principles",
                    Description = "Overview of basic accounting concepts and practices.",
                    IsDeleted = false
                },
                new CourseResource
                {
                    Id = Guid.Parse("c0d1e2f3-b4c5-6789-0123-89abcdef0123"),
                    CourseId = Guid.Parse("0b1c2d3e-4f5a-6789-0123-89abcdef0123"),
                    FileType = "PDF",
                    FilePath = "https://storage.example.com/courses/spanish-vocabulary-guide.pdf",
                    Title = "Advanced Spanish Vocabulary",
                    Description = "Vocabulary guide for advanced Spanish learners.",
                    IsDeleted = false
                }
            };
            context.AddRange(courseResources);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedCourseDataAsync(ApplicationDbContext context)
    {
        if (!await context.Courses.AnyAsync())
        {
            var courses = new List<Course>
            {
                new Course
                {
                    Id = Guid.Parse("1a2b3c4d-5e6f-7890-1234-56789abcdef0"),
                    CourseCategoryId = Guid.Parse("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
                    MentorId = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Title = "C# Programming Basics",
                    Description = "Learn the core concepts of C# programming, including syntax and object-oriented principles.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("2b3c4d5e-6f7a-8901-2345-6789abcdef01"),
                    CourseCategoryId = Guid.Parse("9c9f1e7a-3a3b-4d6d-9f0c-1a2b3c4d5e6f"),
                    MentorId = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Title = "Advanced Machine Learning",
                    Description = "Deep dive into machine learning algorithms and their applications using Python.",
                    Level = CourseLevel.Advanced
                },
                new Course
                {
                    Id = Guid.Parse("3c4d5e6f-7a8b-9012-3456-789abcdef012"),
                    CourseCategoryId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    MentorId = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Title = "Business Strategy Essentials",
                    Description = "Understand key principles of strategic planning for business success.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("4d5e6f7a-8b9c-0123-4567-89abcdef0123"),
                    CourseCategoryId = Guid.Parse("2d5f7e8a-9b1c-4d2e-a3f4-5b6c7d8e9f0a"),
                    MentorId = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Title = "UI/UX Design Principles",
                    Description = "Master user interface and experience design for intuitive digital products.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("5e6f7a8b-9c0d-1234-5678-9abcdef01234"),
                    CourseCategoryId = Guid.Parse("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"),
                    MentorId = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Title = "SEO and Digital Marketing",
                    Description = "Learn search engine optimization and digital marketing strategies for online growth.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("6f7a8b9c-0d1e-2345-6789-abcdef012345"),
                    CourseCategoryId = Guid.Parse("0f1e2d3c-4b5a-6c7d-8e9f-0a1b2c3d4e5f"),
                    MentorId = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Title = "Productivity Hacks",
                    Description = "Discover techniques to boost personal and professional productivity.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("7a8b9c0d-1e2f-3456-7890-bcdef0123456"),
                    CourseCategoryId = Guid.Parse("abcdef01-2345-6789-abcd-ef0123456789"),
                    MentorId = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Title = "Financial Planning 101",
                    Description = "Learn the basics of budgeting, saving, and financial planning.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("8b9c0d1e-2f3a-4567-8901-cdef01234567"),
                    CourseCategoryId = Guid.Parse("12345678-9abc-def0-1234-56789abcdef0"),
                    MentorId = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Title = "Beginner French Language",
                    Description = "Start learning French with foundational grammar and vocabulary.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("9c0d1e2f-3a4b-5678-9012-def012345678"),
                    CourseCategoryId = Guid.Parse("fedcba98-7654-3210-fedc-ba9876543210"),
                    MentorId = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Title = "Mindfulness Meditation",
                    Description = "Explore mindfulness techniques to reduce stress and improve focus.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("0d1e2f3a-4b5c-6789-0123-ef0123456789"),
                    CourseCategoryId = Guid.Parse("11223344-5566-7788-99aa-bbccddeeff00"),
                    MentorId = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Title = "Intro to Civil Engineering",
                    Description = "Learn the fundamentals of civil engineering and infrastructure design.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("1e2f3a4b-5c6d-7890-1234-f0123456789a"),
                    CourseCategoryId = Guid.Parse("00ffeedd-ccbb-aabb-8899-776655443322"),
                    MentorId = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Title = "Classroom Management",
                    Description = "Develop strategies for effective classroom management and student engagement.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("2f3a4b5c-6d7e-8901-2345-0123456789ab"),
                    CourseCategoryId = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                    MentorId = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Title = "Network Security Basics",
                    Description = "Understand the essentials of securing computer networks from threats.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("3a4b5c6d-7e8f-9012-3456-123456789abc"),
                    CourseCategoryId = Guid.Parse("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
                    MentorId = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Title = "JavaScript for Web Dev",
                    Description = "Learn JavaScript to build interactive web applications.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("4b5c6d7e-8f9a-0123-4567-23456789abcd"),
                    CourseCategoryId = Guid.Parse("9c9f1e7a-3a3b-4d6d-9f0c-1a2b3c4d5e6f"),
                    MentorId = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Title = "Data Analysis with Pandas",
                    Description = "Use Python's Pandas library for efficient data analysis and manipulation.",
                    Level = CourseLevel.Advanced
                },
                new Course
                {
                    Id = Guid.Parse("5c6d7e8f-9a0b-1234-5678-3456789abcde"),
                    CourseCategoryId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    MentorId = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Title = "Entrepreneurship 101",
                    Description = "Learn the basics of starting and managing a successful business.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("6d7e8f9a-0b1c-2345-6789-456789abcdef"),
                    CourseCategoryId = Guid.Parse("2d5f7e8a-9b1c-4d2e-a3f4-5b6c7d8e9f0a"),
                    MentorId = Guid.Parse("b2c3d4e5-f678-9012-bcde-f23456789012"),
                    Title = "Advanced Photoshop Techniques",
                    Description = "Master advanced Adobe Photoshop skills for professional graphic design.",
                    Level = CourseLevel.Advanced
                },
                new Course
                {
                    Id = Guid.Parse("7e8f9a0b-1c2d-3456-7890-56789abcdef0"),
                    CourseCategoryId = Guid.Parse("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"),
                    MentorId = Guid.Parse("e5f6a7b8-9012-3456-ef01-567890123456"),
                    Title = "Content Marketing Strategies",
                    Description = "Develop effective content marketing plans to engage audiences.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("8f9a0b1c-2d3e-4567-8901-6789abcdef01"),
                    CourseCategoryId = Guid.Parse("0f1e2d3c-4b5a-6c7d-8e9f-0a1b2c3d4e5f"),
                    MentorId = Guid.Parse("b8c9d0e1-2345-6789-1234-890123456789"),
                    Title = "Public Speaking Skills",
                    Description = "Enhance your public speaking abilities for professional presentations.",
                    Level = CourseLevel.Intermediate
                },
                new Course
                {
                    Id = Guid.Parse("9a0b1c2d-3e4f-5678-9012-789abcdef012"),
                    CourseCategoryId = Guid.Parse("abcdef01-2345-6789-abcd-ef0123456789"),
                    MentorId = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Title = "Accounting for Beginners",
                    Description = "Learn the fundamentals of accounting and financial reporting.",
                    Level = CourseLevel.Beginner
                },
                new Course
                {
                    Id = Guid.Parse("0b1c2d3e-4f5a-6789-0123-89abcdef0123"),
                    CourseCategoryId = Guid.Parse("12345678-9abc-def0-1234-56789abcdef0"),
                    MentorId = Guid.Parse("d0e1f2a3-4567-8901-3456-012345678901"),
                    Title = "Advanced Spanish",
                    Description = "Improve your Spanish fluency with advanced grammar and conversation skills.",
                    Level = CourseLevel.Advanced
                }
            };

            context.Courses.AddRange(courses);
            await context.SaveChangesAsync();
        }
    }

}
