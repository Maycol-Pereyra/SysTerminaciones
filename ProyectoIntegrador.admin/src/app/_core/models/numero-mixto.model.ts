export class NumeroMixto {
    public numeroString: string;
    public numeroDecimal: number;
    public numeroEntero: number;
    public numerador: number;
    public denominador: number;

    // Constructor que acepta un número mixto en formato string
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
            } else {
                throw new Error("Formato de número mixto inválido");
            }
        } else if (typeof numeroMixto === 'number') {
            const entero = Math.floor(numeroMixto);
            const fraccionDecimal = numeroMixto - entero;

            // Supongamos que usamos un denominador máximo de 1000 para la fracción
            const maxDenominador = 1000;
            let denominador = maxDenominador;
            let numerador = Math.round(fraccionDecimal * denominador);

            // Simplificar la fracción
            const gcd = this.obtenerMaximoComunDivisor(numerador, denominador);
            numerador /= gcd;
            denominador /= gcd;

            this.inicializar(entero, numerador, denominador);
        } else {
            throw new Error("Tipo de dato no soportado");
        }
    }

    private inicializar(entero: number, numerador: number, denominador: number): void {
        this.numeroEntero = entero;
        this.numerador = numerador;
        this.denominador = denominador;
        this.numeroDecimal = entero + numerador / denominador;
        this.numeroString = `${entero} ${numerador}/${denominador}`;
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
