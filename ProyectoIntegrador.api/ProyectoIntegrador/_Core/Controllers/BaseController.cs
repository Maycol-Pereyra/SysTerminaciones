using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text;

namespace ProyectoIntegrador.Api._Core.Controllers
{
    public class BaseController<T> : Controller
    {
        protected ILogger<T> _logger;

        public BaseController(ILogger<T> logger)
        {
            _logger = logger;
        }

        protected int GetUsuarioId()
        {
            if (User == null || User.Claims == null) { return -1; }

            var claim = User.Claims.FirstOrDefault(o => o.Type.ToLower() == "usuarioid");
            int usuarioId = 0;

            if (claim == null || int.TryParse(claim.Value, out usuarioId) == false)
            {
                usuarioId = -1;
            }

            return usuarioId;
        }

        protected int? GetUsuarioIdNull()
        {
            if (User == null || User.Claims == null)
            {
                return null;
            }

            var claim = User.Claims.FirstOrDefault(o => o.Type.ToLower() == "usuarioid");

            if (claim == null || claim.Value == null)
            {
                return null;
            }

            if (int.TryParse(claim.Value, out int usuarioId) == false)
            {
                return null;
            }

            return usuarioId;
        }

        protected string GetCedula()
        {
            var claim = User.Claims.FirstOrDefault(o => o.Type.ToLower() == "cedula");
            return claim?.Value ?? "";
        }

        protected string GetLogin()
        {
            var claim = User.Claims.FirstOrDefault(o => o.Type.ToLower() == "login");
            return claim?.Value ?? "";
        }

        protected int GetClienteId()
        {
            var claim = User.Claims.FirstOrDefault(o => o.Type.ToLower() == "clienteid");
            string valor = claim?.Value ?? "0";

            return int.Parse(valor);
        }

        protected IActionResult LogModelState(ModelStateDictionary modelState)
        {
            var sb = new StringBuilder();

            foreach (var item in modelState.Values)
            {
                foreach (var error in item.Errors)
                {
                    sb.AppendLine(error.ErrorMessage);
                }
            }

            _logger.LogError($"Model Stated inválido:\n{sb}");

            return new UnprocessableEntityObjectResult(modelState);
        }

        protected Dictionary<string, string> RequestFiltros()
        {
            var lista = new Dictionary<string, string>();

            var listaFiltro = Request.Query.Where(o => o.Key.StartsWith("filtro.")).ToList();
            if (listaFiltro?.Any() ?? false)
            {
                foreach (var item in listaFiltro)
                {
                    string key = item.Key.Replace("filtro.", "");
                    string value = item.Value.ToString();
                    if (value.Length > 0)
                    {
                        lista.Add(key, value);
                    }
                }
            }

            return lista;
        }

    }
}
