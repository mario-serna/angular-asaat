import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    value = value.toLocaleLowerCase();
    return value.replace(/\b\w/g, symbol => symbol.toLocaleUpperCase());
  }

}
