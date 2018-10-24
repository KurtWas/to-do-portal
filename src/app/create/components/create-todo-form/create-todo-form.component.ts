import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationMessagesService} from '../../../shared/services/validation-messages.service';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss']
})
export class CreateTodoFormComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public toDoItems: Array<string> = [];
  public form: FormGroup;

  public activeValidationMessages = {
    itemName: ''
  };

  private readonly validationMessages = {
    itemName: {
      required: 'The input is required.'
    }
  };

  constructor(
    private readonly _validationMessagesService: ValidationMessagesService,
    public formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initializeFormBuilder();
  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public initializeFormBuilder = (): void => {
    this.form = this.formBuilder.group({
      itemName: ['', Validators.required]
    });
    this.subscriptions = this._validationMessagesService.setupMessages(this.validationMessages,
      this.activeValidationMessages,
      this.form);
  }

  public addChecklistItem = (): void => {
    if (!this.form.valid) {
      this._validationMessagesService.updateValidationMessages(this.validationMessages,
        this.activeValidationMessages,
        this.form);
      return;
    }
    this.toDoItems.push(this.form.value.itemName);
    this.form.get('itemName').setValue('');
  }

  public async removeItem(id: number) {
    this.toDoItems.splice(id, 1);
  }

}
