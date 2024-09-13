import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
//import { GlobalService } from '../global.service'; //data bridge
import { environment, myApConstant } from '../../environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent{// implements OnInit{
  userid: string = ''; username: string = '';  password: string = '';

  @ViewChild('useridIn') useridIn!: ElementRef;
  @ViewChild('usernameIn') usernameIn!: ElementRef;
  @ViewChild('passwordIn') passwordIn!: ElementRef;
 
  //constructor(private dataService: DataService, private myGlobal: GlobalService, private router: Router) { }
  constructor(private dataService: DataService, private router: Router) { }
  ngOnInit() { // alert('ngLogin') 
  }
  login(){
    let uid= this.usernameIn.nativeElement.value;
    let upwd= this.passwordIn.nativeElement.value;
    //alert('login介面中uid>>>' + uid);

    this.dataService.login2(uid, upwd)
    //this.caseService.newcase(this.uclinic, pid, 'MG')
    .then(response => {
      let i = response.i;
      if (i > 0) {//leagle user設定全域變數
        environment.uid = uid;  environment.uname = response.uname;  environment.ucomp = response.ucomp;  
        environment.uempcode = response.uempcode;  environment.uempname = response.uempname;  environment.uempid = response.uempid;  
        alert(response.ucompname + '('+ response.ucomp +')\n暱稱『 ' + response.uname + ' 』 小姐/先生，\n\n您已登入復健診療系統!!');
        // alert('全域測試'+ environment.uempname + environment.uempcode);
        this.router.navigate(['/ptcaselist']);//復健治療系統之應用首頁為 ptCase
      } else { alert('輸入帳密錯誤!'); }
    })
    .catch(error=> { 
      console.error('Error:', error);
    });
  }
}