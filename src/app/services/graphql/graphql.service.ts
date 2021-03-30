import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

interface GraphQLResponse {
  data: any;
  extensions: any;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private get url() {
    return `${environment.baseUrl}/`;
  }

  constructor(
    private http: HttpClient
  ) { }

  public query(query: string = ''): Observable<any> {
    return new Observable(observer => {
      const body = {
        query
      };
      return this.http.post(this.url, body).subscribe({
        next: (response: GraphQLResponse) => {
          observer.next(response.data);
        },
        complete: () => {
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      })
    });
  }
  public mutation(type: string, payload: string, query: string): Observable<any> {
    // const keys = [];

    // for (const [key, value] of Object.entries(payload)) {
    //   keys.push(`${key}: ${value}`);
    // }

    return new Observable(observer => {
      const body = {
        query: `mutation {
          ${type}(${payload}) ${query}
        }`
      };
      return this.http.post(this.url, body).subscribe({
        next: (response: GraphQLResponse) => {
          observer.next(response.data);
        },
        complete: () => {
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      })
    });
  }
}
