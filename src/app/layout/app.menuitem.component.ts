import { ChangeDetectorRef, Component, Host, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { LayoutService } from './service/app.layout.service';
import { Point, PreviewComponent, invoiceDate, invoiceDueDate, invoiceNumber } from './preview/preview.component';
import { Card } from 'primeng/card';
import { SharedDataService } from '../app/service/card.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-menuitem]',
    template: `
		<ng-container>
            <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">{{item.label}} </div>
			<a *ngIf="(!item.routerLink || item.items) && item.visible !== false" [attr.href]="item.url" (click)="itemClick($event)"
			   [ngClass]="item.class" [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}} - <span style="color:orange">{{item.value}}</span></span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>
			<a *ngIf="(item.routerLink && !item.items) && item.visible !== false" (click)="itemClick($event)" [ngClass]="item.class" 
			   [routerLink]="item.routerLink" routerLinkActive="active-route" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{ paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
               [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" 
               [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" [queryParams]="item.queryParams"
               [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}} </span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>

			<ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation">
				<ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
					<li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
				</ng-template>
			</ul>
		</ng-container>
    `,
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = "";

    sharedValues: Map<string, any> = new Map<string, any>();



    constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, public router: Router, private menuService: MenuService, private sharedDataService: SharedDataService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
                }
                else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);


        // TODO : Change later, this will not work this way in the future.
        this.assignKeyValue();


        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.sharedDataService.sharedValue.subscribe(value => {
            this.sharedValues = value;
            this.itemClick();
            this.assignKeyValue();
        });


    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

        if (activeRoute) {
            this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
        }
    }

    itemClick(event?: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event?.preventDefault();
            return;
        }

        // execute command
        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;


        }


        //funcion para animacion

        PreviewComponent.resetCanvas(() => {
            switch (this.key) { //case para que se dibuje la animacion 
                case '1-0':
                    PreviewComponent.drawLine(new Point(0, 140), new Point(800, 190)); // este es de invoice number
                    changeInfoCard(
                        this.sharedValues.get("invoiceNumber"), "Número de Factura", "180px");
                    break;
                case '1-1':
                    console.log('Numero de Orden de compra') // la de orden de compra 
                    // changeInfoCard("223456","Orden de compra", "5px");
                    break;
                case '1-2':
                    PreviewComponent.drawLine(new Point(0, 210), new Point(800, 245))// este de invoice date
                    changeInfoCard(this.sharedValues.get("invoiceDate"), "Fecha de Factura", "200px");
                    break;
                case '1-3':
                    PreviewComponent.drawLine(new Point(0, 260), new Point(800, 300)) // este de invoice DUE date
                    changeInfoCard(this.sharedValues.get("invoiceDueDate"), "Fecha de Vencimiento", "210px");
                    break;

            }
        });


     

        this.menuService.onMenuStateChange({ key: this.key });
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
    }


    /// Funcion para asignar el valor inicial de las cosas, (Esto también cambia el valor del submenu item)
    assignKeyValue() {
        switch (this.key) { //case para que se dibuje la animacion 
            case '1-0':
                this.item.value = this.sharedValues.get('invoiceNumber'); // este es de invoice number
                break;
            case '1-1':
                this.item.value = "0"; // ESTE ES EL DE LA ORDEN DE COMPRA 

                break;
            case '1-2':
              // este de invoice date
                this.item.value = this.sharedValues.get('invoiceDate');
                break;

            case '1-3':
                this.item.value = this.sharedValues.get('invoiceDueDate'); // este de invoice DUE date

                break;

                
        }
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active && !this.root;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }


}

function changeInfoCard(cardInfo: string, cardTitle: string, margin: string) {
    document.getElementById("invoiceCard")!.style.visibility = "visible";
    document.getElementById("cardInfo")!.textContent = cardInfo;
    document.getElementById("cardTitle")!.textContent = cardTitle;
    document.getElementById("invoiceCard")!.style.marginTop = margin;

}
