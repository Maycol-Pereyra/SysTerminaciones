using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api._Core.Infraestructura;
using ProyectoIntegrador.Api.Helpers;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/usuario")]
    public sealed class UsuarioController : BaseController<UsuarioController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        private readonly AppSettings _appSettings;
        private static readonly object _object = new object();

        public UsuarioController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            IOptions<AppSettings> appSettings,
            ILogger<UsuarioController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<UsuarioVm>> Authenticate([FromBody] UsuarioAuthenticationVm vm)
        {
            if (vm == null)
            {
                return BadRequest("Debe especificar el usuario.");
            }

            if (string.IsNullOrWhiteSpace(vm.Login) || string.IsNullOrWhiteSpace(vm.Password))
            {
                return BadRequest("Usuario o contraseña incorrecto");
            }

            var obj = await _dbContext.Usuario
                .Include(o => o.Empleado)
                .Include(o => o.Entidad)
                .Where(o => string.Equals(o.Login, vm.Login))
                .FirstOrDefaultAsync();
            if (obj == null)
            {
                return BadRequest("El usuario y/o contraseña son incorrectos");
            }

            var (usuario, esValido) = AuthenticateUser(obj, vm.Password);
            if (esValido == false)
            {

                return BadRequest("El usuario y/o contraseña son incorrectos");
            }

            if ((usuario?.EstaActivo ?? false) == false)
            {
                return BadRequest("El usuario está inactivo");
            }


            return Ok(usuario);
        }

        [HttpGet("{id}/acceso")]
        public async Task<IActionResult> GetAcceso(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            //TODO; quitar de comentario
            var perfiles = await _dbContext.UsuarioPerfil
                .Where(o => o.UsuarioId == id)
                .Select(o => o.PerfilId)
                .ToListAsync();

            if (perfiles.SinElementos())
            {
                return NotFound();
            }

            var lista = await _dbContext.PerfilAcceso
                .Where(o => perfiles.Contains(o.PerfilId))
                .Select(o => o.AccesoId)
                .Distinct()
                .ToListAsync() ?? new List<string>();

            return Ok(lista);
        }


        [HttpGet]
        public async Task<ActionResult<PagedList<UsuarioIndex>>> Get([FromQuery] UsuarioParameters parameter)
        {
            var lista = _dbContext.Usuario
                .Include(o => o.Empleado)
                .Include(o => o.Entidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<UsuarioIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] UsuarioParameters parameter)
        {
            var lista = _dbContext.Usuario
                .Include(o => o.Empleado)
                .Include(o => o.Entidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] UsuarioVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            vm.EntidadId = await _existenciaService.RegistraActualizaEntidad(_mapper.Map<EntidadVm>(vm));

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Usuario>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.FechaModificacion = DateTime.Now;
                objNew.EstaActivo = true;

                objNew.Entidad = await _dbContext.Entidad
                    .Where(o => o.Id == objNew.EntidadId)
                    .FirstOrDefaultAsync() ?? new Entidad();

                MapUsuarioPerfil(vm, objNew);
                MapEntidadDireccion(vm, objNew);
                MapEntidadTelefono(vm, objNew);

                _dbContext.Usuario.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetUsuario", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Usuario
                .Include(o => o.Entidad)
                .Include(o => o.ListaUsuarioPerfil)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            objUpdate.Entidad.ListaEntidadDireccion = await _dbContext.EntidadDireccion
                .Where(o => o.EntidadId == objUpdate.EntidadId)
                .ToListAsync();

            objUpdate.Entidad.ListaEntidadTelefono = await _dbContext.EntidadTelefono
                .Where(o => o.EntidadId == objUpdate.EntidadId)
                .ToListAsync();

            _mapper.Map(vm, objUpdate);

            objUpdate.FechaModificacion = DateTime.Now;

            MapUsuarioPerfil(vm, objUpdate);
            MapEntidadDireccion(vm, objUpdate);
            MapEntidadTelefono(vm, objUpdate);

            _dbContext.Usuario.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Usuario.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Usuario.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Usuario.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Usuario.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(UsuarioVm vm)
        {
            var entidad = await _dbContext.Entidad.AsNoTracking().FirstOrDefaultAsync(o => o.Id == vm.Id);

            if (entidad == null)
            {
                return Resultado.Invalido($"La entidad especificada no existe");
            }

            if (string.IsNullOrWhiteSpace(vm.Login))
            {
                return Resultado.Invalido($"Debe de especificar el nombre de usuario");
            }

            if (vm.Id == 0 && string.IsNullOrWhiteSpace(vm.Password))
            {
                return Resultado.Invalido($"Debe de especificar la contraseña");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Usuario> Filtrar(IQueryable<Usuario> lista, UsuarioParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetUsuario")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Usuario
                .Include(o => o.Entidad)
                .Include(o => o.ListaUsuarioPerfil)
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<UsuarioVm>(obj);

            var listaTelefono = await _dbContext.EntidadTelefono
                .Where(o => o.EntidadId == vm.EntidadId)
                .AsNoTracking()
                .ToListAsync();

            if (listaTelefono.ContieneElementos())
            {
                vm.ListaEntidadTelefono = _mapper.Map<List<EntidadTelefonoVm>>(listaTelefono);
            }

            var listaDireccion = await _dbContext.EntidadDireccion
                .Where(o => o.EntidadId == vm.EntidadId)
                .AsNoTracking()
                .ToListAsync();

            if (listaDireccion.ContieneElementos())
            {
                vm.ListaEntidadDireccion = _mapper.Map<List<EntidadDireccionVm>>(listaDireccion);
            }

            await CargarPerfil(vm);

            obj.ListaUsuarioPerfil.ForEach(item =>
            {
                var acceso = vm.ListaUsuarioPerfil.FirstOrDefault(o => o.PerfilId == item.PerfilId);
                if (acceso != null)
                {
                    acceso.Seleccionado = true;
                }
            });

            vm.Password = "";

            return Ok(vm);
        }

        ///////

        private void MapUsuarioPerfil(UsuarioVm origen, Usuario destino)
        {
            if (destino.ListaUsuarioPerfil == null)
            {
                destino.ListaUsuarioPerfil = new List<UsuarioPerfil>();
            }

            origen.ListaUsuarioPerfil = origen.ListaUsuarioPerfil.Where(o => o.Seleccionado).ToList()
                ?? new List<UsuarioPerfilVm>();

            int cantidad = destino.ListaUsuarioPerfil.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaUsuarioPerfil[i];

                var itemVm = origen
                    .ListaUsuarioPerfil?
                    .Where(o => o.UsuarioId == item.UsuarioId)
                    .Where(o => o.PerfilId == item.PerfilId)
                    .FirstOrDefault();

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaUsuarioPerfil.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaUsuarioPerfil?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaUsuarioPerfil.Where(o => o.UsuarioId <= 0))
                {
                    var item = _mapper.Map<UsuarioPerfil>(itemVm);
                    destino.ListaUsuarioPerfil.Add(item);
                }
            }
        }

        private (UsuarioVm? Usuario, bool EsValido) AuthenticateUser(Usuario usuario, string password)
        {
            // check if password is correct
            if (!UsuarioHelper.VerifyPasswordHash(password, usuario.PasswordHash, usuario.PasswordSalt))
            {
                return (null, false);
            }

            var vm = _mapper.Map<UsuarioVm>(usuario);

            vm.Token = CrearToken(usuario);

            vm.Password = "";

            return (vm, true);
        }

        private UsuarioVm? VerificaParaCambioContrasena(string login, string password)
        {
            var usuario = _dbContext.Usuario.FirstOrDefault(o => o.Login == login);
            if (usuario == null)
            {
                return null;
            }

            // check if password is correct
            if (!UsuarioHelper.VerifyPasswordHash(password, usuario.PasswordHash, usuario.PasswordSalt))
            {
                return null;
            }

            var vm = _mapper.Map<UsuarioVm>(usuario);

            vm.Token = "";

            vm.Password = "";

            return vm;
        }

        private UsuarioVm? Authenticate(string login, string equipoCodigo, string signatureAccess)
        {
            if (string.IsNullOrWhiteSpace(signatureAccess) || string.IsNullOrWhiteSpace(equipoCodigo) || string.IsNullOrWhiteSpace(login))
            {
                return null;
            }

            var usuario = _dbContext.Usuario.FirstOrDefault(o => o.Login == login);
            if (usuario == null)
            {
                return null;
            }

            var vm = _mapper.Map<UsuarioVm>(usuario);

            vm.Token = CrearToken(usuario);

            vm.Password = "";

            return vm;
        }

        private string CrearToken(Usuario usuario)
        {
            var claims = new Claim[]
            {
                new("name", string.Format("{0} {1}", usuario.Entidad.Nombre, usuario.Entidad.Apellido)),
                new("usuarioId", usuario.Id.ToString()),
                new("cedula", usuario.Entidad.Cedula),
                new("rnc", usuario.Entidad.Rnc),
                new("pasaporte", usuario.Entidad.Pasaporte),
                new("login", usuario.Login.ToString()),
                new("rol", "admin"),
                new("login", usuario.Login.ToString()),
                new(ClaimTypes.Name, usuario.Id.ToString()),
                new(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new(ClaimTypes.Surname, usuario.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtSecret));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                _appSettings.JwtIssuer,
                _appSettings.JwtAudience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn
                );

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenValue;
        }

        private static Resultado PasswordCumpleCondiciones(string password)
        {
            bool tieneMayuscula = false;
            bool tieneMinuscula = false;
            bool tieneSimbolo = false;
            bool tieneNumero = false;

            string simbolos = "!`@#$%^&*()+=-[]\\';,./{}|\":<>?~_";

            for (int i = 0; i < password.Length; i++)
            {
                if (tieneMayuscula == false && char.IsLetter(password[i]) && char.IsUpper(password[i]))
                {
                    tieneMayuscula = true;
                }

                if (tieneMinuscula == false && char.IsLetter(password[i]) && char.IsLower(password[i]))
                {
                    tieneMinuscula = true;
                }

                if (tieneNumero == false && char.IsNumber(password[i]))
                {
                    tieneNumero = true;
                }

                if (tieneSimbolo == false && simbolos.Contains(password[i]))
                {
                    tieneSimbolo = true;
                }
            }

            if (tieneMayuscula == false)
            {
                return Resultado.Invalido("La clave requiere carácteres en mayúscula");
            }

            if (tieneMinuscula == false)
            {
                return Resultado.Invalido("La clave requiere carácteres en minúscula");
            }

            if (tieneNumero == false)
            {
                return Resultado.Invalido("La clave requiere carácteres de número");
            }

            if (tieneSimbolo == false)
            {
                return Resultado.Invalido("La clave requiere carácteres de símbolo");
            }

            return Resultado.Ok();
        }

        private void MapEntidadDireccion(UsuarioVm origen, Usuario destino)
        {
            if (destino.Entidad.ListaEntidadDireccion == null)
            {
                destino.Entidad.ListaEntidadDireccion = new List<EntidadDireccion>();
            }

            int cantidad = destino.Entidad.ListaEntidadDireccion.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadDireccion[i];

                var itemVm = origen
                    .ListaEntidadDireccion?
                    .Where(o => o.PaisId == item.PaisId)
                    .Where(o => o.ProvinciaId == item.ProvinciaId)
                    .Where(o => o.CiudadId == item.CiudadId)
                    .Where(o => o.SectorId == item.SectorId)
                    .Where(o => o.Calle == item.Calle)
                    .Where(o => o.Casa == item.Casa)
                    .FirstOrDefault();

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadDireccion.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadDireccion?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadDireccion.Where(o => o.EntidadId <= 0))
                {
                    var item = _mapper.Map<EntidadDireccion>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadDireccion.Add(item);
                }
            }
        }

        private void MapEntidadTelefono(UsuarioVm origen, Usuario destino)
        {
            if (destino.Entidad.ListaEntidadTelefono == null)
            {
                destino.Entidad.ListaEntidadTelefono = new List<EntidadTelefono>();
            }

            int cantidad = destino.Entidad.ListaEntidadTelefono.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadTelefono[i];

                var itemVm = origen
                    .ListaEntidadTelefono?
                    .FirstOrDefault(o => o.Telefono == item.Telefono);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadTelefono.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadTelefono?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadTelefono.Where(o => o.Id <= 0))
                {
                    var item = _mapper.Map<EntidadTelefono>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadTelefono.Add(item);
                }
            }
        }

        private async Task CargarPerfil(UsuarioVm obj)
        {
            obj.ListaUsuarioPerfil = await _dbContext.Perfil
                .AsNoTracking()
                .Select(o => new UsuarioPerfilVm
                {
                    UsuarioId = 0,
                    PerfilId = o.Id,
                    Seleccionado = false,
                    PerfilDescripcion = o.Descripcion,
                })
                .ToListAsync();
        }
    }
}
