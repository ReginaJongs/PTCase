import { Component, OnInit, ViewChild, ElementRef/*, AfterViewInit*/ } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyForm, FormlyFormBuilder, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
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
  appDocId: number = 0; // showYN: boolean = false;
  formTitle: string ='';
  formShap: FormShape[] = [];//需要轉換datamodel以 銜接html
  //model.ProtocolLink.urlKey = '2000';
  constructor(
    private formService: DataService, private codeServ : CodeServ,//private CodeServ: DataServ,
    private route: ActivatedRoute,
    private myGlobal: GlobalService, 
    private fb: FormlyFormBuilder,
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
      if (tag0 === 'formTitle') {this.formTitle = JSON.stringify(val0);}//自訂的表單名稱所在 tag0/val0
      if ((tag0 === 'fieldGroup') && (typeof val0 === 'object')) { //val0 : tabpage「s」 obj
        const tPagesobj = JSON.parse(JSON.stringify(val0));
        for (const onePageObj of tPagesobj) 
        {i++; alert( 'each 混沌的page 【'+ i +'】\n\n'+ JSON.stringify(onePageObj));
        for (const [tag1, val1] of Object.entries(JSON.parse(JSON.stringify(onePageObj)))) {
          alert( 'each 各頁屬性包:頁籤名、欄位大組包等等=======\n\n'+ tag1 + '\n'+  JSON.stringify(val1));
          if (tag1 === 'fieldGroup')//focus欄位大組包
          { //alert('我只要頁之下的欄位大組包 val1');
            let j = -1;
            const fieldset = JSON.parse(JSON.stringify(val1));
            for (const onefieldObj of fieldset) {//}} 
              j++;
            for (const [tag2, val2] of Object.entries(onefieldObj)) { ind1 = -1;
             //for (const [tag2, val2] of Object.entries(JSON.parse(JSON.stringify(val1)))) { ind1 = -1;
             //alert( '每欄位小包中的屬性=======\n\n'+ tag2 + '\n'+  JSON.stringify(val2));
             if (tag2 === 'templateOptions') {//alert( '再萃取val2'); 
               let selOpt = false;
               for (let [tag3, val3] of Object.entries(JSON.parse(JSON.stringify(val2)))){
                 if (JSON.parse(JSON.stringify(val3)).substring(0, 9) === 'codebook(' ) {//取代碼資料
                   param = JSON.parse(JSON.stringify(val3));
                   param = param.substring(10, param.length -2); 
                   selOpt = true; break;  //break for-loop                      
                 }
               }
               if (selOpt===true){ //代表該欄位要展現下拉選項
                let dropItems = await this.codeServ.codebookitem(param);
                alert('新渠道 codebook\n' + tag1 + ' / ' + tag2 +'\n'+ JSON.stringify(dropItems));
                theForm.fieldGroup[i].fieldGroup[j].templateOptions.options = dropItems;
                //alert(' 呼叫代碼服務完成(type:'+ param +') 回應選項為\n'+ JSON.stringify(dropItems));
              }
             }
             //以下是舊的要往上挪
            if (tag2 === 'fieldGroup') { //val2 : features inside one field
              
              for (const [tag3, val3] of Object.entries(JSON.parse(JSON.stringify(val2)))){
                ind1++;//即tag3?
                //alert('目前的頁籤/欄位 '+tag1 + '/'+ tag3 +'('+ ind1 +')'+ val3);
                for (const [tag4, val4] of Object.entries(JSON.parse(JSON.stringify(val3)))){
                  //alert('資料 '+ JSON.stringify(tag4)+ ' --- '+ JSON.stringify(val4));
                  //if(tag1 === '1'){alert('追索一頁:'+ tag3);}
                  if( typeof tag4 === 'string' && tag4.includes('type') &&
                      typeof val4 === 'string' && val4.includes('link')/* && tag4 === 'type'*/) { //for 自訂衍生的類型 hyperlink
                    //alert('有一個hyperlink' + this.appDocId)
                    //alert('出現hyperlink的欄位 \n'+ JSON.stringify(val3));//tag4 +'(index??? '+ ind1 +')');
                    //this field.docID =this.appDocId)
                    theForm.fieldGroup[tag1].fieldGroup[tag3].templateOptions['docId'] = this.appDocId;
                  }
                  if(tag4 === 'templateOptions'){//tag4 stored field feature(tag)
                    let selOpt = false;
                    for (let [tag5, val5] of Object.entries(JSON.parse(JSON.stringify(val4)))){
                      if (JSON.parse(JSON.stringify(val5)).substring(0, 9) === 'codebook(' ) {
                        alert('取道 codebook');
                        param = JSON.parse(JSON.stringify(val5));
                        param = param.substring(10, param.length -2); 
                        selOpt = true; break;  //break for-loop                      
                      }
                    }
                    if (selOpt===true){
                      let dropItems = await this.codeServ.codebookitem(param);
                      theForm.fieldGroup[tag1].fieldGroup[tag3].templateOptions.options = dropItems;
                      //alert(' 呼叫代碼服務完成(type:'+ param +') 回應選項為\n'+ JSON.stringify(dropItems));
                    }
                  }

                } 
              }
            }
          } }}//alert('下個頁' + (ind0+1));
        }}//end forLoop :tabPage[s] obj
      }

    }

    //alert(JSON.stringify('reform回去\n'+theForm));
    //return (theForm);
   
  }

 //----------------------------------------------------------
  ngOnInit(): void {//  ngAfterViewInit(): void {
    //const ucomp = this.myGlobal.GlobalVar.ucomp;//為免SQL injection
    const ucomp = 'QY00000001';
    let id: number = +this.route.snapshot.paramMap.get('docid')! || 0;
    this.appDocId = id;
    let pid = this.route.snapshot.paramMap.get('patternid');
    //alert('form component: ngInit show /comp: '+ ucomp +'/docid  '+ id+'  /pattern  ' + pid);
    this.myGlobal.GlobalVar.docid = id; //= {docid: id};//追加docid as a global var.
    //alert('測試global'+ this.myGlobal.GlobalVar.docid);
    this.formService.getformdata(ucomp, id).subscribe(
      docgot => {
        //1、展開空單formpattern
        //alert('格式文本  ' + JSON.stringify(docgot.formpattern));
        let formpattern = JSON.parse(JSON.stringify(docgot.formpattern));
        this.fields = [ formpattern ]; //原本這樣寫:未處理dropdown前的空單格式
        this.reform(formpattern);
        this.fields[0].urlKey = id;//指定protocol的連結key
        //alert('兜出來的\n' + JSON.stringify(this.fields));

        //💔解析表單各頁dropdown『欄位』💔

        //this.fields = [ formpattern ];//reset ng-formly form //this.fields = [ formpattern ]

        //2、patch or 智慧按鈕(允許智慧帶入)
        if (docgot.status === '0') { //alert('帶入')
          this.formService.formdeft(ucomp, id).subscribe(
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
    let id: number = +this.route.snapshot.paramMap.get('docid')! || 0;
    const formdata:any  = this.form.value;// 取得表單資料
    const jsondata = JSON.stringify(formdata);
    //alert('異動資料\n' + JSON.stringify(formdata))
    //this.formService.saveformdata(id, formdata).subscribe(
    this.formService.saveformdata(4, formdata).subscribe(
      docgot => {})
    alert('診療相關紀錄異動已儲存!!');
  }
  
}