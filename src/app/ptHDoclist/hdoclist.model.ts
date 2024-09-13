export class HDocShape {
  doc_name: string ='';
  therapist: string;//therapist
  thedate: Date;
  builder: string;
  builddate: Date;
  clinicid: string;
  pid: string;
  patid: number;
  hdocid: number;
  docpat_id: number;
  
    constructor(docname:string, vs: string, thedate: Date, builder: string, builddate: Date, 
                clinicid: string, pid: string, patid: number, hdocid: number, docpat_id:number) 
    {
      this.doc_name = docname;
      this.therapist = vs;
      this.thedate = thedate;
      this.builder = builder;
      this.builddate = builddate;
      this.clinicid = clinicid;
      this.pid = pid;       //身分證號
      this.patid = patid;   //病人流水號
      this.hdocid = hdocid; //編寫的表單號
      this.docpat_id = docpat_id;//套用版號
      // 其他屬性...
    }
  }
