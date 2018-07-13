import { Directive, ElementRef, Renderer,HostListener   } from '@angular/core';


@Directive({
  selector: '[appTest]'
})
export class TestDirective    {

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  @HostListener('mouseover') onMouseOver() {
    this.changeColor('red');
  }

  private changeColor(color: string){

    this.el.nativeElement.style.background = color;


   }

}
