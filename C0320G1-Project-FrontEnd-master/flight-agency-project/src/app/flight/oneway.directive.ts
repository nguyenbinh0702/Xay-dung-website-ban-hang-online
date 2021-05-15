import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[oneWay]'
})
export class OnewayDirective {

  constructor(
    public viewContainer: ViewContainerRef
  ) { }

}
