// CONSTANSTES DE REGEX A UTILIZAR PARA SITUACIONES COMUNES EN EL CODIGO

// Formato para correo simple, donde tienes que tener @ + contenido + (.) + de dos a 4 caracteres
//export const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// Fecha y hora en formato yyyy-MM-ddTHH:mm:ss.fffffff[+-]HH:mmZ (algunos elementos son opcionales)
export const regexFechaIso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
