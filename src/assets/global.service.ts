//import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
//import { PatternValidator } from '@angular/forms';

@Injectable({ providedIn: 'root'})

export class GlobalService {
  public GlobalVar: any = 
  {
    uid: '',
    uname: 'UserName',
    ucomp: '',
    padid: 0,
    caseid: 0,
    docid: 0
  };
}