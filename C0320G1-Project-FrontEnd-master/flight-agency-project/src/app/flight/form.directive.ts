import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appForm]'
})
export class FormDirective {

  constructor(
    public viewContainer: ViewContainerRef
  ) { }

}
