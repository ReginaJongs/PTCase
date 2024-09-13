export class FormShape {
    body: JSON;
    status: string;
    formpattern: JSON;

    constructor(body:JSON, status:string, formpattern: JSON) {
      
      this.body = body;
      this.status = status;
      this.formpattern = formpattern; 
       // 其他屬性...doc jason body??
    }
  }
