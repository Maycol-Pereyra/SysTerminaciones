export class TipoPago {
    id: number;
    descripcion: string;
    conceptoNotaDebitoAhorroId: number;
    conceptoNotaDebitoAhorroDescripcion: string;
    conceptoNotaCreditoAhorroId: number;
    conceptoNotaCreditoAhorroDescripcion: string;
    estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.conceptoNotaDebitoAhorroId = !vm.conceptoNotaDebitoAhorroId ? null : vm.conceptoNotaDebitoAhorroId;
        this.conceptoNotaDebitoAhorroDescripcion = vm.conceptoNotaDebitoAhorroDescripcion || '';
        this.conceptoNotaCreditoAhorroId = !vm.conceptoNotaCreditoAhorroId ? null : vm.conceptoNotaCreditoAhorroId;
        this.conceptoNotaCreditoAhorroDescripcion = vm.conceptoNotaCreditoAhorroDescripcion || '';
        this.estaActivo = !vm.estaActivo ? true : vm.estaActivo;
    }
}
