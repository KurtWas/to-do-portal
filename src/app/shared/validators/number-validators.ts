import {AbstractControl} from '@angular/forms';

export class NumberValidators {
  public static validNumber(control: AbstractControl) {
    // const numberRegEx = RegExp('^[0-9]+$');

    // accepts negative numbers
    const numberRegEx = RegExp('^([-+]?[0-9]+[-,])*[+-]?[0-9]+$');

    if (!control.value) {
      return;
    }

    if (!numberRegEx.test(control.value)) {
      return {
        validNumber: true
      };
    } else {
      return null;
    }
  }
  // check if a number is less than
  // prefix is the Number that should be larger
  public static validLessThan(prefix: any, suffix: any) {
    return (control: AbstractControl): any => {
      const prefixValue = +control.get(prefix).value;
      const suffixValue = +control.get(suffix).value;
      if (prefixValue < suffixValue) {
        control.get(suffix).setErrors({validLessThan: true});
        return {
          validLessThan: true
              };
      } else {
        return null;
      }
    };
  }
}
