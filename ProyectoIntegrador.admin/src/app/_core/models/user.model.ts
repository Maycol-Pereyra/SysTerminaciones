export class User {
    public get fullname(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public estaActivo: boolean,
        public login: string,
        public password: string,
        public token: string | null
    ) { }
}
