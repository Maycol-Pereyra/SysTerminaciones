import Swal from 'sweetalert2';

export abstract class FormIndexBase {
  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  mensajeOk(msg: string): void {
    Swal.fire('Ok', msg, 'success');
  }

  mensajeValidacion(msg: string): void {
    Swal.fire('Validación', msg, 'warning');
  }

  mensajeError(msg: string): void {
    Swal.fire('Validación', msg, 'error');
  }

  confirmacion(msg: string, titulo: string, okCallBack: () => void){
    Swal.fire({
        title: titulo || 'Confirmación',
        text:msg || '¿Está seguro de continuar?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        cancelButtonText:'No',
        confirmButtonText:'Sí'
      }​​​​​​​​).then((result) => {
        if (result.isConfirmed) {
          okCallBack();
        }
    }​​​​​​​​);
  }
}
