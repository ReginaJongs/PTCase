import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment, myApConstant } from '../../environments/environments';
import { CaseShape } from './caselist.model';
import { DataService } from './data.service';//ProjectService

//import { Observable } from 'rxjs';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-case-list',
  templateUrl: './caselist.component.html' ,
  styleUrls: ['./caselist.component.css']
})
export class CaseListComponent implements OnInit { //ProjctListComponent
  caselist: CaseShape[]=[];  uclinic: string='';  pidquery: string=''; showit = false; // 設置為 false 以隱藏 caseid
  @ViewChild('myTable') myTable!: ElementRef;
  filteredCases: CaseShape[] = [];
  @ViewChild('gridHandle', { static: false })
  gridHandle!: DatatableComponent;
  rows = [];

  constructor(
    private caseService: DataService, private router: Router, //private globalService: GlobalService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer
  ) {
      this.matIconRegistry.addSvgIcon("booking", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/images/Booking2.svg"));
  }
  //====================================================================================================
  jump2row(modeopt:number): number {//modeopt :1需顯示訊息  0不顯示額外訊息
    const target = this.pidquery;//已改2Way binding XX(document.getElementById('pidquery') as HTMLInputElement).value;
    if(target.length <=0) {alert('請輸入病人身分證號!!'); return -100;}

    const rows = this.myTable.nativeElement.querySelectorAll('tbody tr');
    let rowInd = -1;
    //rows.forEach((row: HTMLTableRowElement) => {
    rows.forEach((row: HTMLTableRowElement, index: number) => {
      const pid = row.cells[6].textContent; 
      if (pid === target) {
        row.classList.add('highlight');
        //row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        rowInd = index;
      } else { row.classList.remove('highlight'); 
      }
      //environment.ptpid = pid; ???if(pid !== null) environment.ptpid = pid;
    });
    if((rowInd * modeopt) === -1)  {alert('此病人無約診!\n建議建立病人的初診紀錄單(畫面右上方功能鍵)。')};
    return rowInd;//(data rownumber:0-n 或 -1:無此資料列  或 -100介面無輸入)
  }
  //---------------------------------------------------------------------------------------
  rowclick(event:any) {
    const row = event.target.closest('tr');// 取得被點擊的行元素
    this.pidquery  = row.querySelector('td:nth-child(7)').textContent;// 找到該行中的pid欄位元素，並指派其值給查詢欄位
   }

//===新個案(掛號)與初診病歷撰寫===================================================
  newcase() { 
    const ck = this.jump2row(0); if(ck === -100) return; //除非查詢欄位是空值  才不往下執行 //preCheck
    const pid = this.pidquery;
    this.caseService.newcase(this.uclinic, pid, 'MG')
      .then(response => {
        const hdocid = response[0].hdocid;
        //alert('newCase建立之後  Response:'+ JSON.stringify(response) + hdocid);
        this.router.navigate(['/form', hdocid, 10]); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
//進行newCase建立(可能需要建立 pt) alert('進入newCase');
  newcaseOd() { //進行newCase建立(可能需要建立 pt) alert('進入newCase');
    //let hdocno :number = 0;
    const ck = this.jump2row(0); 
    if(ck === -100) return;//除非查詢欄位是空值  才不往下執行
    //if(ck >= 0) return;//除非查詢欄位是空值  才不往下執行
    //有可能有case alert('ck' + ck);
    const pid = this.pidquery//(document.getElementById('pidquery') as HTMLInputElement).value;
    if(ck === -1) {//無相關收案情況 才應該建立案號、診號與單號，甚至病人號
       this.caseService.newcaseregist(this.uclinic, pid, 'MG').subscribe(
          docgot => { //this.doclist = docgot;//放回docmodel中；且bind into HTML view
            this.caseService.pthdocid(this.uclinic, pid, 10).subscribe(//取文件號
              docgot=> {
                alert('取回文號-1\n'+ JSON.stringify(docgot));
                environment.hdocid = Number(JSON.stringify(docgot));//放回docmodel中；且bind into HTML view
              },
              error => { console.log(error);})
          },
          error => { console.log(error); }
       )
    }
    else{ const result = this.caseService.pthdocidP(this.uclinic, pid, 10)
      .then((result) =>  // 在控制台中输出返回值
         {//alert('promise\n'+ result); let hdocno  = result; 
          environment.hdocid = result;
          this.router.navigate(['/form', environment.hdocid, 10]);
          //this.router.navigate(['/form', 2, 10]);
         })
      .catch((error) => { alert(error);}); // 在控制台中输出错误信息
    }
    //alert('請即調整初診單 流水號'+ environment.hdocid);
    //for (let i = 0; i < 100000; i++) {  } 
    //this.router.navigate(['/form', environment.hdocid , 10]);//router.navigate('/form',docid, docpat)
    //this.router.navigate(['/form', 2 , 10]);//router.navigate('/form',docid, docpat)

  }
  //===========================================================
  createHDoc(doctype:string, courseid: number, caseid: number){
    let patternid =0;  let hdocid =0; // alert('ID /' + courseid+'////'+caseid);
    if (doctype === 'PhThx') patternid = 11;//this.router.navigate(['/form', 5, 11]);  //HDocID, doc pattern id
    if (doctype === 'WorkEnv') patternid = 12;//this.router.navigate(['/form', 4, 12]);
    if (doctype === 'CaseNote') patternid = 14;//this.router.navigate(['/form', 3, 13]);
    
    //const result:any = 
    this.caseService.createHDoc(patternid, courseid, caseid)
    .then(response => {
      hdocid = response[0].hdocid; //alert('HDOC建立之後  Response:'+ JSON.stringify(response) + hdocid);
      this.router.navigate(['/form', hdocid, patternid]); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
    //alert('建立新單' , result.)
    //node service insert  拿回 hdocid this.router.navigate(['/form', 5, hdocid]); 
 
  }
  ngOnInit() {//alert('進入ngOini')
    this.uclinic = environment.ucomp;//'QY00000001';//PTHosp  this.globalService.GlobalVar.uclinic;//this.route.snapshot.paramMap.get('companyId');
    //alert('診所個案清單'+ this.uclinic );
    /*this.caseService.getcaselist(this.uclinic).subscribe(
      casegot => { this.caselist = casegot;//bind into HTML view
        this.filteredCases = this.caselist;
      },
      error => { console.log(error);
      }
    );*/
    this.caseService.getcaselist(this.uclinic)
    .then(response => {
      this.caselist  = response;  this.filteredCases = this.caselist;
      //alert('HDOC建立之後  Response:'+ JSON.stringify(response) + hdocid);

    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  filterCases() {
    this.filteredCases = this.caselist.filter(eachcase => eachcase.pid.includes(this.pidquery));
  }

  onSort(event:any) {
    /*
    console.log(this.gridHandle.sorts);
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return (
          a[sort.prop].localeCompare(b[sort.prop]) *
          (sort.dir === 'desc' ? -1 : 1)
        );
      });

      this.rows = rows;
    }, 1000);
    */
  }
}