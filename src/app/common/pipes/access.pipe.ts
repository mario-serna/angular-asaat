import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'access'
})
export class AccessPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0: return 'No';
      case 1: return 'Si';
      default: return '';
    }
  }

}
