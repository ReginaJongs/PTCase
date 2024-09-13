import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Injectable({ providedIn: 'root' })
export class CodeServ { constructor(private http: HttpClient) {}
 //☎☎☎ 代碼資料搜尋-------------------------------------------------
 async codebookitem(codetype: string): Promise<any[]>{
  //<Observable<any[]>> {//) Observable<any> {
    const url = "/api/codebook";  const body = { codetype };
    //alert('into codebookitem!!');
    let options = { //observe: 'response' as 'response',
            headers: new HttpHeaders({ 'content-type': 'application/json' })
    };
    const result: any = await this.http.post(url, body, options).toPromise();
    
    const ddItems = Object.values(result) as any[];
    console.log('result:', result, 'ddItems:', ddItems);
    //alert('代碼服務codebookitem serv>> type:  ' + codetype +'，並取得下列\n'+ JSON.stringify(ddItems));
    return ddItems;   //return of<any[]>(ddItems); 
    /* return new Observable<any[]>(observer => {
         observer.next(ddItems); observer.complete();  });*/
  }
  //☎☎☎ 代碼資料搜尋----程式試寫區---------------------------------------------
  //dropitem(codetype: string): Observable<any>{//測試get用
  dropitem(codetype: string): Observable<[{ id: string, name: string }]>{//測試用

    const url = "api/dropdownitem"; const body = {codetype};//{ param };
    let options = { // observe: 'response' as 'response',
            headers: new HttpHeaders({'content-type': 'application/json'})
    };
    let opt = {observe: 'body', responseType: 'json'};
    interface CodeList { id: string, name: string};
    let codeList: [CodeList];
    alert('http get dropitem:' + codetype);
    /*fail?? belows
    this.http.get<any>("api/codebookX?param1=" + codetype).pipe(
      map((response: any) => {
        const data = response.data;
        return data.map((item: any) => ({
          value: item.id,
          label: item.name
        }));
      })
    );
  */
    //this.http.get<any>("api/codebookX?param1=" + codetype).subscribe(
      
      this.http.get<any>("api/codebookX?param1=" + codetype
   //,{ headers: {accept: 'application/json'},  observe: 'body' as const,
    // responseType: 'json' as const }
     )
    /* .pipe(
      map(response => {
        const data = response.data;
        return data.map((item:any) => ({
          value: item.id,
          label: item.name
        }));
      }),
     )*/
      
     .subscribe(
          response => { //alert('from nodejs service\n' + JSON.stringify(response));
                    const data = response.data; 
                    alert('from nodejs service\n' + JSON.stringify(response));
                    let codeList = JSON.parse(response.data);
                    
      //return JSON.parse(JSON.stringify(response));
      },
      (error) => { console.error(error);
      } 
    ); 
    //alert(''+ JSON.stringify(codeList));
    //return this.http.post<{ id: string, name: string }>(url, body, options).pipe();
     this.http.post<any>(url, body, options).pipe(
      map(res => res.data)
    );
    //return [{id:'1', name:'truc'}, {id:'2', name:'machin'}, {id:'3', name:'bidule'}];
    return this.http.post<any>(url, body, options).pipe(
      map(res => res.data));
 }
 //========================================================================
codebookitemObs(codetype: string): Observable<any[]> {//) Observable<any> {
    
       const url = "/api/codebook";  const body = { codetype };
       let options = { //observe: 'response' as 'response',
               headers: new HttpHeaders({ 'content-type': 'application/json' })
       };
       //alert('post前端測試bookitems of type:  ' + codetype);
   
       //return of( [{"id":'A', "name": '選項A'},{'id':'B', "name": '選項B'}]);
       return this.http.post<any>(url, body, options).pipe(
         map((data: any[]) => {alert('從NODE回傳 \n' + JSON.stringify(data));
         //return data;
           return data.map((item: { id: string, name: string }) => ({ id: item.id, name: item.name }));
         })
       );
       return this.http.post<any>(url, body, options).pipe(
         map(res => [{'id':'A', "name": '選項A'},{'id':'B', "name": '選項B'}])
         );
        
       return this.http.post<any>(url, body, options).pipe(shareReplay(1));
     }


  /*    return this.http.post<{ status: string, body: string, formpattern: string }>(url, body, options).pipe(
      map(res => ({//☎☎☎萃取API結果
        status: res.status,
        formData: res.body,
        formpattern: res.formpattern //JSON.parse(res.formpattern)
      }*/

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
   
}