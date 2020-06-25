import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Financa } from '../models/financa';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FinancasService {
    constructor(
        private readonly http: HttpClient
    ) {  }

    save(obj: any) {
        return this.http.post('/api/financas', obj);
    }

    get(startDate: string = null, endDate: string = null) {
        const params = new HttpParams()
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<{ total: number, financas: Financa[] }>('/api/financas', { params });
    }

    upload(file: File, fileName: string) {
        const data = new FormData();
        data.append('anexo', file, fileName);
        return this.http.post<{ id: string }>('/api/financas/upload', data);
    }

    delete(id: string) {
        return this.http.delete<any>(`/api/financas/${id}`, { observe: 'response' })
            .pipe(map((response) => {
                if (response.status === 200) {
                    return true;
                } else if (response.status === 404) {
                    return false;
                } else {
                    throw new Error(response.body.message || 'Falha não especificada');
                }
            }));
    }

    marcarComoPago(id: string) {
        return this.http.post(`/api/financas/pago/${id}`, null);
    }
}
