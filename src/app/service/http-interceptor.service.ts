import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private readonly api: LoginService
    ) {  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request;

        if (this.api.token) {
            request = req.clone({
                headers: req.headers.set('Authorization', this.api.token)
            });
        }

        return next.handle(request || req)
            .pipe(
                tap((event) => {
                    if (event instanceof HttpResponse) {
                        const token = event.headers.get('Authorization');

                        if (token) {
                            this.api.setToken(token);
                        }
                    }
                })
            );
    }
}
