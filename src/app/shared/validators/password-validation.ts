import {AbstractControl, ValidatorFn} from '@angular/forms';

export class PasswordValidation {
  public static matchPassword(passwordName: string, confirmPasswordName: string): ValidatorFn {
    return (control: AbstractControl): any => {
      const password = control.get(passwordName).value; // to get value in input tag
      const confirmPassword = control.get(confirmPasswordName).value; // to get value in input tag
      if (password !== confirmPassword) {
        control.get(confirmPasswordName).setErrors({matchPassword: true});
      } else {
        return null;
      }
    };

  }

  public static validPassword(control: AbstractControl) {
    const passwordRegEx = RegExp('^(?=.*\\d)(?=.*[A-Z]).{6,30}$');

    if (!passwordRegEx.test(control.value)) {
      return {
        validPassword: true
      };
    } else {
      return null;
    }
  }
}
