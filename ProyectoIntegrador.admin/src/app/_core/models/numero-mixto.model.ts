export class NumeroMixto {
    numeroString: string;
    numeroDecimal: number;
    numeroEntero: number;
    numerador: number;
    denominador: number;

    // Constructor que acepta un número mixto en formato string o un número decimal/entero
    constructor(numeroMixto: string | number) {
        if (typeof numeroMixto === 'string') {
            // Asumimos el formato "Entero Numerador/Denominador"
            const partes = numeroMixto.split(' ');
            if (partes.length === 2) {
                const entero = parseInt(partes[0], 10);
                const fraccion = partes[1].split('/');
                const numerador = parseInt(fraccion[0], 10);
                const denominador = parseInt(fraccion[1], 10);

                this.inicializar(entero, numerador, denominador);
            } else if (partes.length === 1) {
                // Si es solo un número entero
                const entero = parseInt(partes[0], 10);
                this.inicializar(entero, 0, 1); // No hay fracción, denominador es 1
            } else {
                throw new Error("Formato de número mixto inválido");
            }
        } else if (typeof numeroMixto === 'number') {
            const entero = Math.floor(numeroMixto);
            const fraccionDecimal = numeroMixto - entero;

            if (fraccionDecimal === 0) {
                // Si es un número entero puro
                this.inicializar(entero, 0, 1); // No hay fracción, denominador es 1
            } else {
                // Supongamos que usamos un denominador máximo de 1000 para la fracción
                const maxDenominador = 1000;
                let denominador = maxDenominador;
                let numerador = Math.round(fraccionDecimal * denominador);

                // Simplificar la fracción
                const gcd = this.obtenerMaximoComunDivisor(numerador, denominador);
                numerador /= gcd;
                denominador /= gcd;

                this.inicializar(entero, numerador, denominador);
            }
        } else {
            throw new Error("Tipo de dato no soportado");
        }
    }

    private inicializar(entero: number, numerador: number, denominador: number): void {
        this.numeroEntero = entero;
        this.numerador = numerador;
        this.denominador = denominador;
        this.numeroDecimal = entero + (denominador !== 0 ? numerador / denominador : 0);
        this.numeroString = numerador !== 0 ? `${entero} ${numerador}/${denominador}` : `${entero}`;
    }

    private obtenerMaximoComunDivisor(a: number, b: number): number {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}