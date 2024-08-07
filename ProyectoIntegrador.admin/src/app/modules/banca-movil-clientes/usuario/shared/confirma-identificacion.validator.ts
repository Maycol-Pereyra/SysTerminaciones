import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ConfirmaIdentificacionValidator {

  static requiereIdentificacion(control: AbstractControl): ValidationErrors | null {
    const cedula = control.get('cedula')?.value;
    const pasaporte = control.get('pasaporte')?.value;

    if (cedula.length === 0  && pasaporte.length === 0) {
      // control.get('cedula')?.setErrors({ requiereIdentificacion: true });
      // control.get('pasaporte')?.setErrors({ requiereIdentificacion: true });

      return { requiereIdentificacion: true };
    }

    return null;
  }
}
