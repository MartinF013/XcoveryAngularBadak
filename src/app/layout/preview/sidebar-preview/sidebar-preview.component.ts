import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/app/service/card.service';
import { LayoutService } from '../../service/app.layout.service';
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'app-sidebar-preview',
    templateUrl: './sidebar-preview.component.html',
    styleUrls: ['./sidebar-preview.component.scss']
})
export class SidebarPreviewComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService,  ) { }

    ngOnInit() {
        this.model = [
            {

                // El resto de labels los puedes encontrar en app menu component
                label: 'Principal',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Acciones'
                , items: [
                    //  https://www.primefaces.org/diamond/icons.xhtml
                    { label: 'Número de Factura', icon: 'pi pi-fw pi-file' },
                    { label: 'Número de Orden de Compra ', icon: 'pi pi-fw pi-chart-bar' },
                    { label: 'Fecha de Factura', icon: 'pi pi-fw pi-tablet' },
                    { label: 'Fecha de Vencimiento', icon: 'pi pi-fw pi-table' },
                ],
            }


        ];
    }
}
