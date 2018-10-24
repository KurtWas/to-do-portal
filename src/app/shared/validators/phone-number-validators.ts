import {AbstractControl} from '@angular/forms';

export class PhoneNumberValidators {
  public static validPhoneNumber(control: AbstractControl) {
    const phoneNumberRegEx = RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$');

    if (!phoneNumberRegEx.test(control.value)) {
      return {
        validPhoneNumber: true
      };
    } else {
      return null;
    }
  }
}
