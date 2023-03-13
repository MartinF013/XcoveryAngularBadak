import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Se importa desde la carpeta api el archivo customer.ts
import { Customer, DocumentInfoTable } from '../api/customer';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getInfoDocument() {
        return this.http.get<any>('assets/demo/data/document.json')
            .toPromise()
            .then(res => res.data as DocumentInfoTable[])
            .then(data => data);
    }
}
