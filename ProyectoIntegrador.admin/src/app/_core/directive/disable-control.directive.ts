/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition: boolean ) {
    // const action = condition ? 'disable': 'enable';
    // this.ngControl.control[action]();
    this.ngControl.valueAccessor.setDisabledState(condition);
  }

  constructor( private ngControl: NgControl ) { }
}
