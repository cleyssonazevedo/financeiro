import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {

    transform(value: number) {
        switch (value) {
            case 0:
                return 'Pago';
            case 1:
                return 'Vencido';
            case 2:
                return 'Em dia';

            default:
                return 'Status não encontrado';
        }
    }
}
