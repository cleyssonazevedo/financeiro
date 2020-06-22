import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {

    transform(value: number) {
        switch (value) {
            case 1:
                return 'Pago';
            case 2:
                return 'Vencido';
            case 3:
                return 'Em dia';

            default:
                return 'Status não encontrado';
        }
    }
}
