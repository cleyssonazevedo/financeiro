import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FinancasResolverService implements Resolve<any> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const startDate = route.params.startDate;
        const endDate = route.params.endDate;

        console.log(startDate);
        console.log(endDate);
        return null;
    }
}
