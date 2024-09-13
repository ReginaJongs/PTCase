export class DocShape {
    app_proj_code: string;
    doc_name: string;
    version_code: string ='';
    edit_date: Date;
    appdoc_id: number;
    formpattern_id: number;
    // 其他屬性...
  
    constructor(app_proj_code:string, doc_name: string, 
      version_code: string, edit_date: Date, appdoc_id: number, formpattern_id: number) {
      
      this.app_proj_code = app_proj_code;
      this.doc_name = doc_name;
      this.version_code = version_code;
      this.edit_date = edit_date;
      this.appdoc_id = appdoc_id;
      this.formpattern_id = formpattern_id;
       // 其他屬性...doc jason body??
    }
  }
