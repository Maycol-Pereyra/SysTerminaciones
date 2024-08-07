import { AbstractControl } from '@angular/forms';

export class ConfirmacionPasswordValidator {

  static passwordSonIguales(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmacionPassword = control.get('confirmacionPassword').value;

    if (password !== confirmacionPassword) {
      control.get('confirmacionPassword').setErrors({ passwordSonIguales: true });
    } else {
      return null;
    }
  }
}
