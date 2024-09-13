import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getcaselist(clinicid: string): Promise<any> { //Observable<any> {
    const url = "/api/ptcaselist" //api url :透過proxy設定轉址到  node.js :8168
    const body = { clinicid };//alert('service接收參數 hosp' + clinicid);
    let options = {  headers: new HttpHeaders({ 'content-type': 'application/json' }) };
    return lastValueFrom(this.http.post(url, body, options));
    //return this.http.post<any>(url, body, options).pipe( );
  }
  newcaseregist(cliniccode: string, pid: string, mng: string): Observable<any> {
    const url = "/api/newcaseregist" //建立專案所需文件實體於appdoc中
    const body = { cliniccode, pid, mng}; //manager>>應為員工號
    //alert('ucomp' + compcode);
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.post<any>(url, body, options).pipe(
      //map(res => res.i)
    );
  }
  ptcaseno(cliniccode: string, pid: string): Observable<any> {
    const url = "/api/ptcaseno" 
    const body = { cliniccode, pid}; 
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.post<any>(url, body, options).pipe(
      //map(res => res.i)
    );
  }
  newcase(cliniccode: string, pid: string, mng: string): Promise<any> {
    const url = "/api/newcaseregist" //建立專案所需文件實體於appdoc中
    const body = { cliniccode, pid, mng}; //manager>>應為員工號
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})};

    return lastValueFrom(this.http.post(url, body, options));
  }
  createHDoc(patternid:number, courseid:number, caseid:number): Promise<any> {
    const url = "/api/createHDoc" 
    const body = { patternid, courseid, caseid}; 
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})};

    return lastValueFrom(this.http.post(url, body, options));
  }
  pthdocid(cliniccode: string, pid: string, hdoctype: number): Observable<number[]> {
    const url = "/api/pthdocid" 
    const body = { cliniccode, pid, hdoctype}; 
    //alert('進入前端取文號'+ JSON.stringify(body));
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})
    };
    //const docObj = this.http.post<any>(url, body, options);
    return this.http.post<any>(url, body, options).pipe(
      map((docObj) => docObj.data))
     //map(res => res.i)
    //return this.http.post<any>(url, body, options).pipe( ); //map(res => res.i)
  }
  async pthdocidP(cliniccode: string, pid: string, hdoctype: number): Promise<number> {
    const url = "/api/pthdocid";
    const body = { cliniccode, pid, hdoctype };
    const options = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };
    const docObj = await this.http.post<any>(url, body, options).toPromise();
    //alert(' pthdocidP 取文號\n'+ JSON.stringify(docObj));
    return docObj.docid;
  }
  pthdocid2(cliniccode: string, pid: string, hdoctype: number){//:Observable<any> {
    const url = "/api/pthdocid" 
    const body = { cliniccode, pid, hdoctype}; 
    //alert('進入前端取文號'+ JSON.stringify(body));
    let options = { headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.post<any>(url, body, options).toPromise(); //map(res => res.i)
    return this.http.post<any>(url, body, options).pipe( ); //map(res => res.i)
  }
}