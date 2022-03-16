import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  async get(uri: string){
    return this.http.get('http://localhost:3000/'+uri).toPromise()
  }
}
