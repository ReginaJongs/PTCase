export class CaseShape {
  casetype: string ='';
  pat: string;
  birthdate: Date;
  gender: string;
  startdate: Date;
  manager: string;
  pid: string;
  phoneno: string;
  clinicid: string;
  caseid: number;
  courseid: number;
  
    constructor(casetype:string, pat: string, birthdate: Date, gender: string,startdate: Date, manager: string, phoneno: string, pid: string, clinicid:string, caseid: number, courseid: number) {
      this.casetype = casetype;
      this.pat = pat;
      this.birthdate = birthdate;
      this.gender = gender;
      this.startdate = startdate;
      this.manager = manager;
      this.pid = pid;
      this.phoneno = phoneno;
      this.clinicid = clinicid;
      this.caseid = caseid;
      this.courseid = courseid;
      // 其他屬性...
    }
  }
