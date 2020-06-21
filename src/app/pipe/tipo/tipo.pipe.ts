import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tipo' })
export class TipoPipe implements PipeTransform {

    transform(value: number) {
        switch (value) {
            case 0:
                return 'Crédito';
            case 1:
                return 'Débito';

            default:
                return 'Tipo não encontrado';
        }
    }
}
