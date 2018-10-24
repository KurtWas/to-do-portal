import {AbstractControl} from '@angular/forms';

export class PercentageValidators {
  public static validPercentage(control: AbstractControl) {
    const phoneNumberRegEx = RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$');

    if (!phoneNumberRegEx.test(control.value)) {
      if (!(Number(control.value) >= 0 && (Number(control.value) <= 100))) {
        return {
          validPercentage: true
        };
      }
    } else {
      return null;
    }
  }
}
