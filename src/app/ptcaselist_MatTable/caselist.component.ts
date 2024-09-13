import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment, myApConstant } from '../../environments/environments';
import { CaseShape } from './caselist.model';
import { DataService } from './data.service';//ProjectService

import { Observable } from 'rxjs';
//import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

import { MatTableDataSource, MatTable } from '@angular/material/table'; 
import { MatPaginator,PageEvent  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-case-list',
  templateUrl: './caselist.component.html' ,
  styleUrls: ['./caselist.component.css']
})
 
export class CaseListComponent implements OnInit {
  caselist: CaseShape[]=[];  uclinic: string='';  pidquery: string=''; showit = true; // 設置為 false 以隱藏 caseid
  
  displayedColumns: string[] = ['casetype', 'pat', 'birthdate', 'gender', 'startdate', 'manager', 'pid', 'phoneno', 'actions'];
  //displayedColumns: string[] = ['casetype', 'pat', 'birthdate', 'gender', 'startdate', 'manager', 'pid', 'phoneno', 'clinicid', 'caseid', 'courseid', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild('mattable') sort!: MatSort;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myTable') table!: MatTable<any>;
 
  constructor(
    private caseService: DataService, private router: Router, //private globalService: GlobalService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer
  ) {
      this.matIconRegistry.addSvgIcon("booking", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/images/Booking2.svg"));
  }
  //===========================================================
  ngOnInit() {

    this.uclinic = environment.ucomp;
    this.caseService.getcaselist(this.uclinic)
    .then(response => { this.caselist = response;  //alert('HDOC建立之後  Response:'+ JSON.stringify(response) + hdocid);
      this.dataSource.data= response;
      /*this.dataSource.data= [  {"casetype":"Physio","pat":"馬溜溜"}, {"casetype":"Physio","pat":"朱五花"}, 
        {"casetype":"Physio","pat":"沙千刀"}, {"casetype":"Physio","pat":"袁滾滾"}   // 其他資料
      ];*/
    })
    .catch(error => { console.error('Error:', error);
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }//end of ngOnInit
  //---------------------------------------------------------------------------
  jump2row(modeopt:number): number {//modeopt :1需顯示訊息  0不顯示額外訊息
    const target = this.pidquery;//已改2Way binding XX(document.getElementById('pidquery') as HTMLInputElement).value;
    if(target.length <=0) {alert('請輸入病人身分證號!!'); return -100;}

    
    let rowInd = -1;
    /*const rows = this.myTable.nativeElement.querySelectorAll('tbody tr');
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
    */
   return rowInd;//(data rownumber:0-n 或 -1:無此資料列  或 -100介面無輸入)
  }
//===新個案(掛號)與初診病歷撰寫===================================================
  newcase() { 
    const ck = this.jump2row(0); if(ck === -100) return; //除非查詢欄位是空值  才不往下執行 //preCheck
    const pid = this.pidquery;
    this.caseService.newcase(this.uclinic, pid, 'MG')
      .then(response => {
        const hdocid = response[0].hdocid; //alert('newCase建立之後  Response:'+ JSON.stringify(response) + hdocid);
        this.router.navigate(['/form', hdocid, 10]); 
      })
      .catch(error => { console.error('Error:', error);
      });
  }
  createHDoc(doctype:string, courseid: number, caseid: number){
    let patternid =0;  let hdocid =0; // alert('ID /' + courseid+'////'+caseid);
    if (doctype === 'PhThx') patternid = 11;//this.router.navigate(['/form', 5, 11]);  //HDocID, doc pattern id
    if (doctype === 'WorkEnv') patternid = 12;//this.router.navigate(['/form', 4, 12]);
    if (doctype === 'CaseNote') patternid = 14;//this.router.navigate(['/form', 3, 13]);
    
    this.caseService.createHDoc(patternid, courseid, caseid)
    .then(response => {
      hdocid = response[0].hdocid; //alert('HDOC建立之後  Response:'+ JSON.stringify(response) + hdocid);
      this.router.navigate(['/form', hdocid, patternid]); 
    })
    .catch(error => { console.error('Error:', error);
    });
  }
  //-Mat Table Operation----------------------------------------------------------------------------

  onPageChange(event: PageEvent) {
    //alert('Page event:\n'+ JSON.stringify( event));    // 你可以在這裡處理分頁邏輯，例如更新資料源或其他操作
    this.paginator.pageSize = event.pageSize;
    this.dataSource.paginator = this.paginator;
  }

  sortData(event: Sort) {
    const data = this.dataSource.data.slice();
    if (!event.active || event.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'pat': return compare(a.pat, b.pat, isAsc);
        case 'birthdate': return compare(a.birthdate, b.birthdate, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'manager': return compare(a.manager, b.manager, isAsc);
        case 'pid': return compare(a.pid, b.pid, isAsc);
        // 其他欄位的排序邏輯
        default: return 0;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
//----------------------------------------------------
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

