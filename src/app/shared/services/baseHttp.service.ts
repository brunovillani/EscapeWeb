import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/app/environments/environments';
import { Helper } from 'src/app/utils/helper';

export class BaseHttpService {
    
    getHeader = new HttpHeaders();
    constructor (
        private http: HttpClient
    ) {
        this.getHeader.append('Context-type', 'text/xml')
    }

    //#region Data formatting
    private getRoute(route: string | any[]): string {
        if (!Array.isArray(route)) {
            route = [route];
        }
        return environment.apiUrl + route.join('/');
    }

    private getHttpParams(parameters): HttpParams {
        let params = new HttpParams();

        if (parameters) {
            Object.keys(parameters).forEach(key => {
                if (Array.isArray(parameters[key])) {
                    parameters[key].forEach(p => {
                        if (p != null) {
                            params = params.append(key, this.getParamValue(p));
                        }
                    });
                } else if (parameters[key] != null) {
                    params = params.append(key, this.getParamValue(parameters[key]));
                }
            });
        }

        return params;
    }

    private getParamValue(value: any) {
        if (value instanceof Date) {
            value = Helper.datas.obterDateString(value);
        } else {
            value = value.toString();
        }
        return value;
    }
    //#endregion

    //#region Verbs
    protected get<T>(route: string | any[], parameters: Object = null): Observable<T> {
        const httpParams = this.getHttpParams(parameters);
        const url = this.getRoute(route);

        return <Observable<T>>(
            this.http
                .get(url, { params: httpParams, headers: this.getHeader })
                .pipe(
                    map(result => 
                        result),
                    catchError(error => 
                        this.catchError(error, url))
                )
        );
    }

    protected post<T>(route: string | any[], body: Object = null, parameters: Object = null): Observable<T> {
        const httpParams = this.getHttpParams(parameters);
        const url = this.getRoute(route);

        return <Observable<T>>(
            this.http
                .post(url, body, { params: httpParams })
                .pipe(
                    map(result => result),
                    catchError(error => this.catchError(error, url))
                )
        );
    }

    protected put<T>(route: string | any[], body: Object = null, parameters: Object = null): Observable<T> {
        const httpParams = this.getHttpParams(parameters);
        const url = this.getRoute(route);

        return <Observable<T>>(
            this.http
                .put(url, body, { params: httpParams })
                .pipe(
                    map(result => result),
                    catchError(error => this.catchError(error, url))
                )
        );
    }

    protected delete<T>(route: string | any[], parameters: Object = null): Observable<T> {
        const httpParams = this.getHttpParams(parameters);
        const url = this.getRoute(route);

        return <Observable<T>>(
            this.http
                .delete(url, { params: httpParams })
                .pipe(
                    map(result => result),
                    catchError(error => this.catchError(error, url))
                )
        );
    }

    protected patch<T>(route: string | any[], parameters: Object = null): Observable<T> {
        const httpParams = this.getHttpParams(parameters);
        const url = this.getRoute(route);

        return <Observable<T>>(
            this.http
                .patch(url, { params: httpParams })
                .pipe(
                    map(result => result),
                    catchError(error => this.catchError(error, url))
                )
        );
    }
    //#endregion

    private catchError(error: HttpErrorResponse, url: string): Observable<any> {
        return Observable.throw(error);
    }
}
