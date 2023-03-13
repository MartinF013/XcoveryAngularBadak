import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    fileSelected: File | null = null;
    fileName: string = '';
    fileSrc: string = '';

    constructor(private productService: ProductService, public layoutService: LayoutService) {

    }

    ngOnInit() {

    }


    fileChangeEvent(event: any) {
        this.fileSelected = event.target.files[0];
        this.fileSrc = URL.createObjectURL(event.target.files[0]);
        console.log(this.fileSelected);
        console.log(this.fileSrc);
    }

    removeFile() {
        this.fileSelected = null;
    }



    openFileSelector() {
        const fileSelector = document.getElementById('file-selector');
        fileSelector?.click();

    }


    ngOnDestroy() {

    }
}
