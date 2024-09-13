import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { environment, myApConstant } from '../../environments/environments';
import { HDocShape } from './hdoclist.model';
import { DataService } from './data.service';//ProjectService

import { Observable } from 'rxjs';
//import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hdoc-list',
  templateUrl: './hdoclist.component.html' ,
  styleUrls: ['./hdoclist.component.css']
})
export class HDocListComponent implements OnInit { //ProjctListComponent
  hDoclist: HDocShape[]=[];  uclinic: string='';  pid: string='';//pidquery: string='';
  showit = false; // 設置為 false 以隱藏 版面上於視覺無意義的流水號
  @ViewChild('myTable') myTable!: ElementRef;
  
  constructor(
    private hdocService: DataService, private router: Router, private route: ActivatedRoute,//private globalService: GlobalService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer
  ) {
      this.matIconRegistry.addSvgIcon("booking", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/images/Booking2.svg"));
  }
  //===========================================================
  /*editHDoc(doctype:string, PID: string){
    if (doctype === 'PhThx') this.router.navigate(['/form', 5, 11]);  //HDocID, doc pattern id
    if (doctype === 'WorkEnv') this.router.navigate(['/form', 4, 12]);
    if (doctype === 'CaseNote') this.router.navigate(['/form', 3, 13]);
  }*/
  ngOnInit() {
    this.pid = this.route.snapshot.paramMap.get('pid')!;  //pid從傳遞的參數取出  不由環境變數this.pid = environment.ptpid; 
    this.uclinic = environment.ucomp;  //alert('進入ngOini' + this.uclinic + this.pid);
    
    this.hdocService.gethdoclist(this.uclinic, this.pid).subscribe(
      hdocgot => { this.hDoclist = hdocgot;//bind into HTML view
      },
      error => { console.log(error);
      }
    );
  }
}