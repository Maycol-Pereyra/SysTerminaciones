﻿using System.ComponentModel;
using System.Reflection;

namespace ProyectoIntegrador.Api._Core.Helper
{
    public static class EnumHelper
    {
        public static string ObtenerDescripcion(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null &&
                attributes.Length > 0)
            {
                return attributes[0].Description;
            }
            else
            {
                return value.ToString();
            }
        }
    }
}
