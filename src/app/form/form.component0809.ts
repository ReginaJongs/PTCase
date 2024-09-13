import { Component, OnInit, ViewChild, ElementRef/*, AfterViewInit*/ } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyForm, FormlyFormBuilder, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
//import { GlobalService } from '../global.service';
import { environment, myApConstant } from '../../environments/environments';
import { FormShape } from './form.model';
import { DataService } from './data.service';//FormService
//import { DataServ } from '../formly/dataservice';//FormService
import { CodeServ } from '../../service/data.codebook';//CodeBookService
//import { ReactiveFormsModule } from '@angular/forms';
//import { FormlyModule } from '@ngx-formly/core';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
//import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
interface FormObject { type: string, fieldGroup: []};
interface moreFormly extends FormlyFieldConfig {
  urlKey: number;
}
@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.css', './form.formlycomponent.scss'],
  //styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  @ViewChild('myButton', { static: true }) myButton!: ElementRef<HTMLButtonElement>;
  form = new FormGroup({});  model: any = {};
  //model = {    ProtocolLink: { urlKey: 3 }  };
  options: FormlyFormOptions = {};  fields: moreFormly[] = [];//FieldConfig[] = [];
  activeTab: number = 0; //appDocId: number = 0; // showYN: boolean = false;
  hdocid: number =0; formTitle: string ='';
  formShap: FormShape[] = [];//需要轉換datamodel以 銜接html
  //model.ProtocolLink.urlKey = '2000';

  constructor(
    private formService: DataService, private codeServ : CodeServ,//private CodeServ: DataServ,
    private route: ActivatedRoute,
    //private myGlobal: GlobalService, 
    private fb: FormlyFormBuilder,  private cdr: ChangeDetectorRef,//手動檢測??
    private http: HttpClient ) {
      //this.options = { formState: { isButtonDisabled: true } }
    }
  onSubmit() { this.formdatasave(); 
  }
  onClickTest() { alert('Title clicked! to open another page');//測試
  }

 //💔💔parsing formly物件內容:針對select欄位調整以及hyperlink
 //------------------------------------------------------------------------------
  async reform(theForm: any): Promise<any>{ //reform(theForm: any): Observable<any>{
    let param :string = ""; let i = -1; let ind1 = -1; //let ind0 = -1;  
    //alert('看看reform表'+ JSON.stringify(theForm));
    for (const [tag0, val0] of Object.entries(theForm)) {//val0 設定tabs
      //if (!(tag0 === 'type' && val0 === 'tabs')) { break; }//????若開宗明義未標tabpage 就無法parsing
      if (tag0 === 'formTitle') {this.formTitle = JSON.stringify(val0).substring(1, JSON.stringify(val0).length -1);}//自訂的表單名稱所在 tag0/val0
      if (tag0 === 'fieldGroup') //&& (typeof val0 === 'object')) 
      { const tPagesobj = JSON.parse(JSON.stringify(val0));
        for (let i = 0; i < tPagesobj.length; i++)
        { 
          const onePageObj = tPagesobj[i];
          //alert('頁?  ' + i +'\n\n' + '共個'+ onePageObj.fieldGroup.length + '欄位\n\n' +JSON.stringify(onePageObj.fieldGroup));
          for (let j = 0; j < onePageObj.fieldGroup.length ; j++)
          { const attbs = onePageObj.fieldGroup[j].templateOptions;
            if (attbs != null) 
            { if (attbs.options != null)
              { if (attbs.options.substring(0, 9) ===  'codebook(' )
                { param = attbs.options; param = param.substring(10, param.length -2); 
                  const dropItems = await this.codeServ.codebookitem(param);
                  //alert('取代碼選項 codebook\n' + tag1 + ' / ' + tag2 +'\n(i/j)' + i + ' / ' + j+'\n'+ JSON.stringify(dropItems));
                  theForm.fieldGroup[i].fieldGroup[j].templateOptions.options = dropItems;
                }
              };
              if (attbs.type != null) //for hyperlink
              { if (attbs.type ===  'link')
                { theForm.fieldGroup[i].fieldGroup[j].templateOptions.docID = environment.hdocid;//this.appDocId;
                }
              } 
            }  
             //theForm.fieldGroup[tag1].fieldGroup[tag3].templateOptions['docId'] = this.appDocId; 
          }
        }
      }

    }

  }

 //----------------------------------------------------------
  ngOnInit(): void {//  ngAfterViewInit(): void {
    //const ucomp = this.myGlobal.GlobalVar.ucomp;//為免SQL injection
    const uclinic = environment.ucomp;  //const hdocid = environment.hdocid;//this.appDocId = id;
    //const hdocid = this.route.snapshot.paramMap.get('docid');  
    this.hdocid = +this.route.snapshot.paramMap.get('docid')! || 0; //const ptnid = environment.
    let pid = this.route.snapshot.paramMap.get('patternid'); //應該要改成 environment
    //alert('form component: ngInit show /uclinic: '+ uclinic +'/docid  '+ this.hdocid +'  /pattern  ' + pid);
    /*this.myGlobal.GlobalVar.docid = id; //= {docid: id};//追加docid as a global var.
    //environment.hdocid = hdocid; 
    //alert('測試global'+ this.myGlobal.GlobalVar.docid);*/
    this.formService.getformdata(uclinic, this.hdocid).subscribe(
      docgot => {
        //1、展開空單formpattern

        let formpattern = JSON.parse(JSON.stringify(docgot.formpattern));
        this.fields = [ formpattern ]; //原本這樣寫:未處理dropdown前的空單格式
        alert('格式文本  ' + JSON.stringify(docgot.formpattern));
        this.reform(formpattern);
        this.fields[0].urlKey = this.hdocid;//指定protocol的連結key
        //alert('兜出來的\n' + JSON.stringify(this.fields));

        //💔解析表單各頁dropdown『欄位』💔

        //this.fields = [ formpattern ];//reset ng-formly form //this.fields = [ formpattern ]

        //2、patch or 智慧按鈕(允許智慧帶入)
        if (docgot.status === '0') { //alert('帶入')
          this.formService.formdeft(uclinic, this.hdocid).subscribe(
            deftgot => {// 取得智慧建議資料；alert(JSON.stringify(deftgot.deft));
              var len = JSON.stringify(deftgot.deft).length;
              if (len > 0)  {
                 this.model = deftgot.deft;
                 alert('啟動『智慧帶入』功能，並已將相關資料帶入各欄位!!');//判斷null
            }
          })
        }
        else{//patch 早先的異動'
          //alert('早先的異動formData:'+ JSON.stringify(docgot.formData)); //alert('\nformData:'+ docgot.formpattern);
          //const formData = JSON.parse(docgot.formData);//XXX this.form.patchValue({"firstname":"ddd"}); (docgot.formData);
          this.model = docgot.formData;//☎☎☎重要 for UI updating (✦✦patchValue無法使用)
      };
      },
      error => {
        console.log(error);
      }
    );

    //buttonControl = this.form.get('myButton');
    //this.buttonControl.disable();
    //this.myButton.nativeElement.disabled = true;
    //this.options.formState.isButtonDisabled = !this.form.valid;

  }
  //----------------------------------------------------------
  autodef(): void {//智慧帶入
    //alert('auto default them')
  }
  //----------------------------------------------------------
  formdatasave(): void {//異動資料回存
    //let id: number = +this.route.snapshot.paramMap.get('hdocid')! || 0;
    const formdata:any  = this.form.value;// 取得表單資料
    const jsondata = JSON.stringify(formdata);
    //alert('異動資料\n' + JSON.stringify(formdata))
    //this.formService.saveformdata(id, formdata).subscribe(
    this.formService.saveformdata(this.hdocid, formdata).subscribe(
      docgot => {})
    alert('診療相關紀錄異動已儲存!!');
  }
 //tab 視覺控制
  setActiveTab(index: number) { this.activeTab = index; alert('hit!!');  this.cdr.detectChanges(); // 手動觸發變更檢測
    }
  
}