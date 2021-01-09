import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appGetCategories]'
})
export class GetCategoriesDirective {
  // @Input('test') test: string;

  constructor(private el: ElementRef) { }

  @HostListener('focus') onFocus() {
    console.log('On Focus');
  }

}
