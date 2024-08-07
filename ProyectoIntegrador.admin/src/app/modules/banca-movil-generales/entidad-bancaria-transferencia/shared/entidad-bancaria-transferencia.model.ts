export class EntidadBancariaTransferencia {
  public id: number;
  public nombre: string;
  public cuentaBanco: string;
  public rnc: string;
  public entidadIdentificador: string;
  public entidadNumero: string;
  public codigoIban: string;
  public codigoSwift: string;
  public nota: string;
  public estaActivo: boolean;
  public usaDestinoAportacion: boolean;
  public usaDestinoAhorro: boolean;
  public usaDestinoCorriente: boolean;
  public usaDestinoPrestamo: boolean;
  public usaDestinoTarjetaCredito: boolean;
  public tipoModeloArchiboBatchId: number;
  public numeroBatch: string;
  public tipoCuentaBanco: string;

  constructor(vm: any) {
    vm = vm || {};
    this.id = vm.id || 0;
    this.nombre = vm.nombre || '';
    this.cuentaBanco = vm.cuentaBanco || '';
    this.rnc = vm.rnc || '';
    this.entidadIdentificador = vm.entidadIdentificador || '';
    this.entidadNumero = vm.entidadNumero || '';
    this.codigoIban = vm.codigoIban || '';
    this.codigoSwift = vm.codigoSwift || '';
    this.nota = vm.nota || '';
    this.estaActivo = vm.estaActivo === undefined ? false : vm.estaActivo;
    this.usaDestinoAportacion = vm.usaDestinoAportacion || false;
    this.usaDestinoAhorro = vm.usaDestinoAhorro || false;
    this.usaDestinoCorriente = vm.usaDestinoCorriente || false;
    this.usaDestinoPrestamo = vm.usaDestinoPrestamo || false;
    this.usaDestinoTarjetaCredito = vm.usaDestinoTarjetaCredito || false;
    this.tipoModeloArchiboBatchId = vm.tipoModeloArchiboBatchId || 0;
    this.numeroBatch = vm.numeroBatch || '';
    this.tipoCuentaBanco = vm.tipoCuentaBanco || '';
  }
}
