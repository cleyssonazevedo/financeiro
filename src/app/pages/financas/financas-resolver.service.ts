import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FinancasService } from 'src/app/service/financas.service';
import * as moment from 'moment';

@Injectable()
export class FinancasResolverService implements Resolve<any> {
    constructor(
        private readonly financas: FinancasService
    ) {  }

    resolve(route: ActivatedRouteSnapshot) {
        return this.getData(route.params.startDate, route.params.endDate);
    }

    getData(start: string, end: string) {
        const startDate = start || moment().startOf('month').format('DD-MM-YYYY');
        const endDate = end || moment().endOf('month').format('DD-MM-YYYY');

        return this.financas.get(startDate, endDate);
    }
}
