import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'EUR'
})
export class EurPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toFixed(2)} €`;
  }
}
