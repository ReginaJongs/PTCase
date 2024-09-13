import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
//@Injectable()

export class GlobalService {
  GlobalVar: any = {
    uid: '',
    uname: 'UserName',
    ucomp: '',
    docid: 0
  };
}