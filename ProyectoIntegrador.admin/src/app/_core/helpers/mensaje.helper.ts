import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class Mensajes {
  static mensajeOk(msg: string): void {
    Swal.fire('Ok', msg, 'success');
  }

  static mensajeValidacion(msg: string): void {
    Swal.fire('Validación', msg, 'warning');
  }

  static mensajeErrorMsg(msg: string): void {
    Swal.fire('Validación', msg, 'error');
  }

  static confirmacion(msg: string, titulo: string, okCallBack: () => void){
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

  static confirmaORechaza(msg: string, titulo: string, okCallBack: () => void, noCallBack: () => void) {
    return Swal.fire({
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
          if (okCallBack) {
            okCallBack();
          }
        } else {
          if (noCallBack) {
            noCallBack();
          }
        }
    }​​​​​​​​);
  }

  public static mensajeError(error): string {
    if (error.status >= 200 && error.status < 300) {
      return '';
    } else if (error.status === 400) {
      return error.error;
    } else if (error.status === 401) {
      return 'Unauthorized';
    } else if (error.status === 403) {
      return 'Forbidden';
    } else if (error.status === 404) {
      return 'Not Found';
    } else if (error.status === 405) {
      return 'Method Not Allowed';
    } else if (error.status === 405) {
      return 'Method Not Allowed';
    } else if (error.status >= 400 && error.status < 500) {
      return 'Client Error';
    } else if (error.status === 500) {
      // console.log(error);
      if (error.error) {
        return error.error;
      }
      return 'Internal Server Error';
    } else if (error.status > 500 && error.status < 600) {
      return 'Internal Server Error';
    } else {
      return 'Operation fail.';
    }
  }

  public static toastInfo(titulo: string) {
    // position, can be: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      animation: true,
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });

    toast.fire({
      icon: 'info',
      text: '',
      title: titulo,
      timer: 2000
    });
  }

  public static toastSuccess(titulo: string, timer = 2000) {
    // position, can be: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      animation: true,
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });

    return toast.fire({
      icon: 'success',
      text: '',
      title: titulo,
      timer
    });
  }

  public static toastError(titulo: string) {
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      animation: true,
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });

    toast.fire({
      icon: 'error',
      text: '',
      title: titulo,
      timer: 2000
    });
  }

  public static toastWarning(titulo: string) {
    // position, can be: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
    const toast = Swal.mixin({
      toast: true,
      // position: 'top-right',
      animation: true,
      position: 'bottom',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });

    return toast.fire({
      icon: 'warning',
      text: '',
      title: titulo,
      timer: 2000
    });
  }
}
