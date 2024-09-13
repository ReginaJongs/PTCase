import { Component, OnInit } from '@angular/core';
//import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocShape } from './appdoclist.model';
import { DataService } from './data.service';//AppDocService
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './appdoclist.component.html',
  styleUrls: ['./appdoclist.component.css']
})
export class AppDocListComponent implements OnInit { //AppDocListComponent
  //compcode: string;//避免sql injection
  appProjId: number =0;
  appdoclist: DocShape[] = [];//以datamodel 銜接html

  constructor(
    private appdocService: DataService,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {//alert('拿參數來'+this.route.snapshot.paramMap.get('projid'));
    }

  ngOnInit(): void {

    const ucomp = this.globalService.GlobalVar.ucomp;//為免SQL injection，讀自global Var
    let id = this.route.snapshot.paramMap.get('projid');//參數名需與routing path 一致
    this.appProjId = id ? parseInt(id) : 0;
    //alert('nginit  參數是...'+ this.appProjId + ucomp + ', 資料型態是...' + typeof this.appProjId);

    this.appdocService.getdoclist(ucomp, this.appProjId).subscribe(
      docgot => {
        this.appdoclist = docgot;//放回docmodel中；且bind into HTML view
      },
      error => {
        console.log(error);
      }
    );



  }
}