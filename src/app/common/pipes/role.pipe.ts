import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch (value) {
      case 0: return 'Admin';
      case 1: return 'Tutor';
      case 2: return 'Alumno';
      default: return '';
    }
  }

}
