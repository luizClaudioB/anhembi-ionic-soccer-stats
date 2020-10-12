import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {

  domElement: any;

  constructor(private renderer: Renderer2, private eleRef: ElementRef) {
    this.domElement = this.eleRef.nativeElement;

    const requiredStyles = {
      'background-color': '#eaeaea',
      'color': '#a7a7a7',
      'border-radius': '5px',
      'margin-bottom': '1rem',
      'font-size': '1.18rem',
      'max-height': '4rem',
      'min-height': '4rem',
    };

    Object.keys(requiredStyles).forEach(property => {
      this.renderer.setStyle(
        this.domElement,
        `${property}`,
        requiredStyles[property]
      );
    });
  }
}
