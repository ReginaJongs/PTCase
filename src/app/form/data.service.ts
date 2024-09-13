import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  //☎☎☎ 表單資料與格式擷取---------------------------------------------------
  getformdata(cliniccode: string, docid: number): Observable<{ status: string, formData: any, formpattern: any }> {
    const url = "/api/formdataCase" //取得『個案管理』文件樣張『格式』與最新修正資料
    const body = { cliniccode, docid };    //alert(url +'\n' + cliniccode + '...'+ docid);
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };

    return this.http.post<{ status: string, body: string, formpattern: string }>(url, body, options).pipe(
      map(res => ({//☎☎☎萃取API結果
        status: res.status,
        formData: res.body,
        formpattern: res.formpattern //JSON.parse(res.formpattern)
      })) //end of map
    );
  }
  //☎☎☎ 智慧引入資料-----------------------------------------------
  formdeft(clinicid: string, hdocid: number): Observable<any> {
    const url = "/api/formdeftHDoc" //取得智慧預設資料
    const body = { clinicid, hdocid };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };
     
    return this.http.post<any>(url, body, options).pipe(
      //map(res => res.i)
    );
  }
  //☎☎☎ 表單資料異動儲存---------------------------------------------------
  saveformdata(docid: number, formdata: JSON): Observable<any> {
    const url = "/api/formdatasaveHDoc" //將介面上的修正資料交由node.js後端存入資料庫
    const body = { docid, formdata };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };
    return this.http.post<any>(url, body, options).pipe(
    );
  }
  //☎☎☎ 代碼資料搜尋-------------------------------------------------
  dropitem(param: string): Observable<any>{//測試用
    const url = "/api/codebook"; const body = { codetype: param };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({'content-type': 'application/json'})
    };
    //return this.http.post<{ id: string, name: string }>(url, body, options).pipe();
    return this.http.post<any>(url, body).pipe(
      map(res => res.data)
    );
    //return [{id:'1', name:'truc'}, {id:'2', name:'machin'}, {id:'3', name:'bidule'}];

 }
  codebookitem(codetype: string): Observable<any[]> {
    const url = "/api/projlist";  const body = { codetype };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({ 'content-type': 'application/json' })
    };
    alert('bookitems of type:  ' + codetype);//alert('opt:  ' + JSON.stringify(opt));
    this.http.post<any>(url, body, options).pipe();
    return this.http.post<any>(url, body, options).pipe(shareReplay(1));
  }

  codebookitemX(codetype: string, opt: any): Observable<any> {
    const url = "/api/codebook";
    const body = { codetype };
    let options = { // observe: 'response' as 'response',
      headers: new HttpHeaders({
            'content-type': 'application/json'
      })};
    alert('bookitems of type:  ' + codetype);
    alert('opt:  ' + JSON.stringify(opt));
    //return this.http.post<FormlyFormOptions>(url, body, {...opt });
    return this.http.post<FormlyFormOptions>(url, body, options);
  }
  codebook(codetype: string): Observable<any> {
    const url = "/api/codebook" 
    const body = { codetype };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };
    alert('bookitems of type:  ' + codetype);
    alert('opt:  ' + JSON.stringify(options));
    return this.http.post<FormlyFormOptions>(url, body, options);
    //return this.http.post<FormlyFormOptions[]>(url, body, options);
    //return this.http.post<any>(url, body, options).pipe();
    //return this.http.post(url, body).toPromise().then(response => response!.data);

  }
  codebook1(codetype: string): Observable<any> {
    const url = "/api/codebook" //將介面上的修正資料交由node.js後端存入資料庫
    const body = { codetype };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({
                  'content-type': 'application/json'
            })
    };
    //alert('http serv.');
    return this.http.post<any>(url, body, options).pipe();
    //return this.http.post(url, body).toPromise().then(response => response!.data);

  }
  //ngxformly格式資料調整
}