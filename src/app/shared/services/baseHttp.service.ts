import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments';
import { Helper } from 'src/app/utils/helper';


/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

export class BaseHttpService {
  getHeader: HttpHeaders;
  constructor(
    private http: HttpClient,
    public router: Router,
    private serviceName: string = ''
  ) {
    this.getHeader = new HttpHeaders();
    this.getHeader.append('Content-type', 'application/json')
  }

  //#region route formatting
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

  private createFullUrl(url: string, httpParams: HttpParams): string {
    const queryString = httpParams.toString();

    return url + (queryString ? '?' + queryString : '');
  }
  //#endregion

  //#region http verbs
  protected get<T>(route: string | any[], parameters: Object = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
      .get(url, { params: httpParams, headers: this.getHeader })
      .pipe(
        map((data: any) => { return data; }),
        catchError(this.handleError(this.serviceName, 'get'))
      );
  }

  protected post<T>(route: string | any[], body: Object = null, parameters: Object = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
        .post(url, body, { params: httpParams })
        .pipe(
          map((data: any) => { return data; }),
          catchError(this.handleError(this.serviceName, 'post'))
        );
  }

  protected put<T>(route: string | any[], body: Object = null, parameters: Object = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
        .put(url, body, { params: httpParams })
        .pipe(
          map((data: any) => { return data; }),
          catchError(this.handleError(this.serviceName, 'put'))
        );
  }

  protected delete<T>(route: string | any[], parameters: Object = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
        .delete(url, { params: httpParams })
        .pipe(
          map((data: any) => { return data; }),
          catchError(this.handleError(this.serviceName, 'delete'))
        );
  }

  protected patch<T>(route: string | any[], parameters: Object = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
        .patch(url, { params: httpParams })
        .pipe(
          map((data: any) => data),
          catchError(this.handleError(this.serviceName, 'patch'))
        );
  }
  //#endregion

  //#region exception

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // const message = (error.error instanceof ErrorEvent) ?
      //   error.error.message :
      //  `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      // this.messageService.showMessage(`${serviceName}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of( result );
    };
  }
  //#endregion
}