import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputDirective } from './input/input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [InputDirective],
  exports: [InputDirective]
})
export class DirectivesModule { }
