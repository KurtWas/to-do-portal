import {AbstractControl} from '@angular/forms';

export class EmailValidators {
  public static validEmail(control: AbstractControl) {
    const emailRegEx = RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');

    if (!emailRegEx.test(control.value)) {
      return {
        validEmail: true
      };
    } else {
      return null;
    }
  }
}
