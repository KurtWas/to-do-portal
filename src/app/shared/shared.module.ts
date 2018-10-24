import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationMessagesService} from './services/validation-messages.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    ValidationMessagesService
  ]
})
export class SharedModule { }
