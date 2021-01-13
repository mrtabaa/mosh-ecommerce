import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRemoveDoubleSpace]'
})
export class RemoveDoubleSpaceDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('keyup') removeDoubleSpace(): void {
    const value = this.elRef.nativeElement.value as string;
    value.endsWith('  ')
      ? this.elRef.nativeElement.value = value.slice(0, -1)
      : this.elRef.nativeElement.value = value;
  }

}
