import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getdoclist(compcode: string, projid: number): Observable<any> {
    const url = "/api/appdoclist" //取得專案文件清單
    const body = { compcode, projid };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };
    //alert('計畫' + projid + ' 所需填寫表單啟動調閱....')
    return this.http.post<any>(url, body, options).pipe(
      //map(res => res.i)
    );
  }
}