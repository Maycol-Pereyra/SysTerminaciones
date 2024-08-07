using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ProyectoIntegrador.Api._Core.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlerMiddleware> _logger;

        public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                string mensaje;
                switch (error)
                {
                    case DbUpdateConcurrencyException e:
                        _logger.LogError(e, e.Message);
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        mensaje = @"El registro que está tratando de realizar fue modificado por otro usuario
                        despues de usted haber cargado la información. La actividad fue cancelada, favor de 
                        recargar los datos y volver a realizar la operación.";
                        break;
                    case ArgumentNullException e:
                        _logger.LogInformation(e, e.Message);
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        mensaje = e.Message;
                        break;
                    case ArgumentException e:
                        _logger.LogInformation(e, e.Message);
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        mensaje = e.Message;
                        break;
                    case KeyNotFoundException e:
                        _logger.LogInformation(e, e.Message);
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        mensaje = e.Message;
                        break;
                    case NotImplementedException e:
                        _logger.LogError(e, e.Message);
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        mensaje = e.Message;
                        break;
                    default:
                        _logger.LogError(error, error?.Message);
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        mensaje = "No se pudo completar la operación.";
                        break;
                }

                await response.WriteAsync(mensaje);
            }
        }
    }
}
