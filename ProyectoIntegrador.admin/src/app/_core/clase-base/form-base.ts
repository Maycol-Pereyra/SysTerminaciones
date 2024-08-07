import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NumberHelper } from '../helpers/number.helper';

export abstract class FormBase {
  public formGroup: FormGroup;

  get formValue(): any {
    return this.formGroup.value;
  }

  get trabajoformValue(): any {
    return this.formGroup.value.trabajo.value;
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  ///
  isControlValidFg(fg: FormGroup, controlName: string): boolean {
    const control = fg.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalidFg(fg: FormGroup, controlName: string): boolean {
    const control = fg.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasErrorFg(fg: FormGroup, validation: string, controlName: string) {
    const control = fg.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouchedFg(fg: FormGroup, controlName: string): boolean {
    const control = fg.controls[controlName];
    return control.dirty || control.touched;
  }
  ///

  fixCantidadNumeroEntero(controlNombre: string) {
    const campo = this.formGroup.get(controlNombre) as FormControl;
    const valor = NumberHelper.obtenerValorNumerico(campo.value);

    if (valor !== Math.trunc(valor)) {
      campo.setValue(Math.trunc(valor));
      campo.updateValueAndValidity();
    }
  }

  fixCantidadNumeroEnteroFg(fg: FormGroup, controlNombre: string) {
    const campo = fg.get(controlNombre) as FormControl;
    const valor = NumberHelper.obtenerValorNumerico(campo.value);

    if (valor !== Math.trunc(valor)) {
      campo.setValue(Math.trunc(valor));
      campo.updateValueAndValidity();
    }
  }

  fixCantidadNull(controlNombre: string) {
    this.fixCantidadNullFg(this.formGroup, controlNombre);
  }

  fixCantidadNullFg(fg: FormGroup, controlNombre: string) {
    const campo = fg.get(controlNombre) as FormControl;
    if (!campo.value || campo.value === null) {
      campo.setValue(0);
      campo.updateValueAndValidity();
    }
  }

  fixMontoDosDecimales(controlNombre: string) {
    this.fixMontoDosDecimalesFg(this.formGroup, controlNombre);
  }

  fixMontoDosDecimalesFg(fg: FormGroup, controlNombre: string) {
    const campo = fg.get(controlNombre) as FormControl;
    const valor1 = NumberHelper.obtenerValorNumerico(campo.value);
    const valor2 = NumberHelper.obtenerValorNumerico(valor1.toFixed(2));

    if (valor1 !== valor2) {
      campo.setValue(valor2);
      campo.updateValueAndValidity();
    }
  }

  getStringFromDate(value: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const DELIMITER = '/';
    value = new Date(value);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    const ano = value.getFullYear();
    return `${dia}` + DELIMITER + `${mes}` + DELIMITER + `${ano}`;
  }

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
