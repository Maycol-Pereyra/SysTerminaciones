import { AbstractControl } from '@angular/forms';

export class ConfirmacionPasswordValidator {

  static passwordSonIguales(control: AbstractControl) {
    const password = control.get('passwordNuevo').value;
    const confirmacionPassword = control.get('confirmacionPassword').value;

    if (password !== confirmacionPassword) {
      control.get('confirmacionPassword').setErrors({ passwordSonIguales: true });
    } else {
      return null;
    }
  }

  static passwordViejoNuevoSonIguales(control: AbstractControl) {
    const passwordViejo = control.get('passwordViejo').value;
    const passwordNuevo = control.get('passwordNuevo').value;

    if (passwordViejo === passwordNuevo) {
      control.get('passwordNuevo').setErrors({ passwordViejoNuevoIguales: true });
    } else {
      return null;
    }
  }
}
