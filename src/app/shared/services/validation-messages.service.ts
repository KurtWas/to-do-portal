import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable()
export class ValidationMessagesService {
  private readonly debounceTime = 500;

  constructor() {
  }

  public setupMessages = (validationMessages: any, activeValidationMessages: any, form: FormGroup): Array<Subscription> => {
    const subscription: Array<Subscription> = [];
    Object.keys(validationMessages)
      .forEach(controlName => {
        const control = form.get(controlName);
        if (control instanceof FormGroup) {
          Object.keys(validationMessages[controlName])
            .map(childControlName => {
              const childControl = control.get(childControlName);
              subscription.push(childControl.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe(() => {
                this.setValidationMessage(childControl, childControlName, validationMessages, activeValidationMessages, false, controlName);
              }));
            });

        } else {
          subscription.push(control.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe(() => {
            this.setValidationMessage(control, controlName, validationMessages, activeValidationMessages, false);
          }));
        }
      });
    return subscription;
  }

  private setValidationMessage(control: AbstractControl, controlName: string,
                               validationMessages: any, activeValidationMessages: any,
                               saving: boolean, parentControlName: string = ''): void {
    if (parentControlName) {
      activeValidationMessages[parentControlName][controlName] = '';
      if ((control.touched || control.dirty || saving) && control.errors) {
        activeValidationMessages[parentControlName][controlName] = Object.keys(control.errors)
          .map(key => {
            return validationMessages[parentControlName][controlName][key];
          }).join(' ');
      }
    } else {
      activeValidationMessages[controlName] = '';
      if ((control.touched || control.dirty || saving) && control.errors) {
        activeValidationMessages[controlName] = Object.keys(control.errors)
          .map(key => {
            return validationMessages[controlName][key];
          }).join(' ');
      }
    }

  }

  public updateValidationMessages = (validationMessages: any, activeValidationMessages: any, form: FormGroup) => {
    Object.keys(validationMessages)
      .forEach(controlName => {
        const control = form.get(controlName);
        if (control instanceof FormGroup) {
          Object.keys(validationMessages[controlName])
            .map(childControlName => {
              const childControl = control.get(childControlName);
              this.setValidationMessage(childControl, childControlName, validationMessages, activeValidationMessages, true, controlName);
            });
        } else {
          this.setValidationMessage(control, controlName, validationMessages, activeValidationMessages, true);
        }
      });
  }
}
