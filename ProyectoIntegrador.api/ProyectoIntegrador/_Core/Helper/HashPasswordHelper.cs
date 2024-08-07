namespace ProyectoIntegrador.Api._Core.Helper
{
    public class HashPasswordHelper
    {
        public static (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHash(string password)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Debe especificar el código o contraseña.", "password");
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var passwordSalt = hmac.Key;
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return (passwordHash, passwordSalt);
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
                throw new ArgumentException("Debe especificar el código o contraseña.", "password");
            }

            if (storedHash.Length != 64)
            {
                throw new ArgumentException("El tamaño del hash es incorrecto. (64 bytes expected).", "passwordHash");
            }

            if (storedSalt.Length != 128)
            {
                throw new ArgumentException("El tamaño del hash salt es incorrecto (128 bytes expected).", "passwordHash");
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
