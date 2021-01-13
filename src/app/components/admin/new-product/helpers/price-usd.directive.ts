import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appPriceUsd]'
})
export class PriceUsdDirective {
  constructor(private elRef: ElementRef, private decimalPipe: DecimalPipe) { }

  @HostListener('focus') initializeValue(): void {
    if (this.elRef.nativeElement.value === '') {
      this.elRef.nativeElement.value = '0.00';
    }
  }

  @HostListener('keyup') formatUsd(): void {
    let value: string;
    value = this.elRef.nativeElement.value as string;
    value = this.removeNonDigtis(value); // remove all non-digit values
    value = this.addDecimalPoint(value); // Add . to the -2 index
    value = this.applyDecimalPipe(value); // to divide every thousand
    this.elRef.nativeElement.value = value;
  }

  removeNonDigtis(value: string): string {
    let inputArray: string[] = [];
    const digitArray: string[] = [];

    // 12a34b to ["1", "2", "a", "3", "4", "b"]
    inputArray = value.split('');

    // remove any non-digit value
    for (const iterator of inputArray) {
      if (/[0-9]/.test(iterator)) {
        digitArray.push(iterator);
      }
    }

    return digitArray.join('');
  }

  addDecimalPoint(value: string): string {
    const inputArray = value.split(''); // ['0', '.', '0', '0']
    inputArray.splice(-2, 0, '.'); // place decimal in -2
    return inputArray.join('');
  }

  applyDecimalPipe(value: string): string {
    console.log(value);
    return value === '' || value === '.'
      ? '0.00'
      : this.decimalPipe.transform(value, '1.2-2');
  }
}
