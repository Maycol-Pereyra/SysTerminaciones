using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProyectoIntegrador.Api;
using ProyectoIntegrador.Api._Core.Infraestructura;
using ProyectoIntegrador.Api._Core.Middleware;
using ProyectoIntegrador.Data;
using Serilog;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .MinimumLevel.Warning()
            .CreateLogger();

        var builder = WebApplication.CreateBuilder(args);

        Console.Title = "proyecto-integrador-api";

        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "SysTerminaciones Api", Version = "v1" });

            c.AddSecurityDefinition("basic", new OpenApiSecurityScheme()
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Ingrese su toekn"
            });

            c.CustomSchemaIds(type => type.FullName);

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id="basic"
                        }
                    }, new List<string>()
                }
            });
        });

        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.InicialiarMapper();

        builder.Services.AddHttpContextAccessor();

        builder.Services.AddLocalServices();

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("Admin", policy => policy.RequireClaim("rol", "admin"));
        });

        builder.Services.AddSerilog();
        
        var corsUrls = builder.Configuration["AppSettings:CorsUrls"];

        var allowAnyOrigin = builder.Configuration.GetValue<bool>("AppSettings:AllowAnyOrigin");

        builder.Services.AddCors(options =>
        {
            var listaUrl = corsUrls?.Split(',') ?? [];

            options.AddPolicy("default", policy =>
            {
                if (allowAnyOrigin == false)
                {
                    policy.WithOrigins(listaUrl)
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                }
                else
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                }
            });
        });

        var appSettingsSection = builder.Configuration.GetSection("AppSettings");

        builder.Services.Configure<AppSettings>(appSettingsSection);

        var appSettings = appSettingsSection.Get<AppSettings>();
        var key = Encoding.UTF8.GetBytes(appSettings?.JwtSecret ?? "");

        builder.Services
            .AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration[appSettings?.JwtIssuer ?? ""],
                    ValidAudience = builder.Configuration[appSettings?.JwtAudience ?? ""],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings?.JwtSecret ?? ""))
                };
            });

        var app = builder.Build();

        app.UseAuthentication();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("default");

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.UseMiddleware<ErrorHandlerMiddleware>();

        app.MapControllers();

        app.Run();
    }
}