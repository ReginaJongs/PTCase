import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private http!: HttpClient;
  constructor(private http: HttpClient) {}
  setHttpClient(http: HttpClient) {
    this.http = http;
  }
  nodetest(){
    alert('httpclient test 2 nodes');
    let url = "/api/test" 
    this.http.get("/api/test").subscribe( (response: any) => {
      alert(response); //console.log(response);
      }, (error: any) => { alert(error); }
      );
  };
  
  login2(uid: string, upwd: string): Promise<any> {
    const url = "/api/login" //api url :透過proxy設定轉址到  node.js :8168
    const body = { uid, upwd };
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})};

    return lastValueFrom(this.http.post(url, body, options));
  }
  
}