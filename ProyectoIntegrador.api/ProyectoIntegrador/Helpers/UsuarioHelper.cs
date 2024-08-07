using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;

namespace ProyectoIntegrador.Api.Helpers
{
    public static class UsuarioHelper
    {
        public static Resultado ValidarModelo(UsuarioVm vm, ApplicationDbContext context, string clienteNombre = "")
        {

            if (string.IsNullOrWhiteSpace(vm.Nombre))
            {
                return Resultado.Invalido("Debe especificar el nombre.");
            }

            if (!string.IsNullOrWhiteSpace(vm.Nombre) && !string.IsNullOrWhiteSpace(vm.Apellido))
            {
                string nombreCompleto = vm.Nombre + vm.Apellido;
                var obj1 = context.Usuario
                    .Include(o => o.Entidad)
                    .FirstOrDefault(o => o.Id != vm.Id && o.Entidad.Nombre + o.Entidad.Apellido == nombreCompleto);
                if (obj1 != null)
                {
                    return Resultado.Invalido("El nombre completo ya existe para otra relación.");
                }
            }

            if (string.IsNullOrWhiteSpace(vm.Login))
            {
                return Resultado.Invalido("Debe de especificar el usuario.");
            }

            var obj2 = context.Usuario.FirstOrDefault(o => o.Id != vm.Id && o.Login == vm.Login);
            if (obj2 != null)
            {
                return Resultado.Invalido("El nombre de usuario de acceso ya existe para otro cliente.");
            }

            return Resultado.Ok();
        }

        public static Usuario RegistrarNuevo(UsuarioVm vm, int? usuarioAdminId, ApplicationDbContext context, IMapper mapper, Object objectX)
        {
            var obj = mapper.Map<Usuario>(vm);
            obj.EstaActivo = true;
            //obj.RequiereCambioPassword = true;
            obj.FechaCreacion = DateTime.Now;

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(vm.Password, out passwordHash, out passwordSalt);
            obj.PasswordHash = passwordHash;
            obj.PasswordSalt = passwordSalt;

            lock (objectX)
            {
                context.Usuario.Add(obj);
                context.SaveChanges();

                vm.Id = obj.Id;
                vm.Password = "";
            }

            return obj;
        }

        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            }

            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            }

            if (storedSalt.Length != 128)
            {
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
