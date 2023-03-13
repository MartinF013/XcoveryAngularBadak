import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SharedDataService {
  sharedValueSource: BehaviorSubject<Map<string,string>> = new BehaviorSubject<Map<string,string>>(new Map<string,string>(
    [
      ['invoiceNumber', '123456'],
      ['invoiceDate', '2021-08-18'],
      ['invoiceDueDate', '2021-08-18']
    ]
  ));
  sharedValue = this.sharedValueSource.asObservable();

  constructor() {}

  changeValue(value: Map<string,string>) {
    this.sharedValueSource.next(value);
  }

}