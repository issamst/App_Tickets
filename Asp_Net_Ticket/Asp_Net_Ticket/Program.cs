using Asp_Net_Ticket.Context;
using Asp_Net_Ticket.Service.Ticket;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddScoped<Ticket_Services>();


builder.Services.AddCors(option =>
option.AddPolicy("MyPolicy", builder =>
                            {
                                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                            })
            ); ;
builder.Services.AddDbContext<AppDbContext>(option=>
            {
                option.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnStr"));
            }
            );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
