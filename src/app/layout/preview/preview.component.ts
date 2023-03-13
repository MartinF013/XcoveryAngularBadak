import { Component, OnDestroy, Renderer2, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SharedDataService } from 'src/app/app/service/card.service';
import { AppSidebarComponent } from 'src/app/layout/app.sidebar.component';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

export let invoiceNumber: string;
export let invoiceDate: string;
export let invoiceDueDate: string;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnDestroy {

  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;






  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

  constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private sharedDataServicer: SharedDataService) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
            || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

          if (isOutsideClicked) {
            this.hideMenu();
          }
        });

      }

      if (!this.profileMenuOutsideClickListener) {
        this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
            || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

          if (isOutsideClicked) {
            this.hideProfileMenu();
          }
        });
      }

      if (this.layoutService.state.staticMenuMobileActive) {
        this.blockBodyScroll();
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    }
    else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    }
    else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
        'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple
    }
  }

  ngOnDestroy() {

    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
  ngOnInit() {
    this.copyImageToCanvas();

    invoiceDate = '2021-08-18';
    invoiceDueDate = '2021-08-18';




  }

  static drawLine(firstCoords: Point, secondCoords: Point) {
    var canvas = document.getElementById('canvasAnimation') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    ctx!.beginPath();
    ctx!.lineWidth = 2;
    ctx!.strokeStyle = 'orange';
    // ctx!.moveTo(firstCoords.x, firstCoords.y); // dibuja la linea del punto A
    ctx!.lineTo(secondCoords.x, secondCoords.y); //dibuja la linea del puntpo B, Hay que poner las coordenadas que se necesitan 
    ctx!.stroke();
    ctx!.strokeRect(secondCoords.x, secondCoords.y, 150, 50);// para dibujar el rectangulo 

  }



  copyImageToCanvas() {
    var image = new Image(50, 50);
    image.src = "https://www.neat.com/wp-content/uploads/2021/10/invoicetemplate.jpg";
    var canvas = document.getElementById('canvasAnimation') as HTMLCanvasElement;
    var ctx = canvas!.getContext('2d');

    image.onload = function () {


      ctx!.drawImage(
        image, 0, 0, 1000, 1000
      );

    }

  }

  static resetCanvas(cuandoTermine: Function) {
    var image = new Image(50, 50);
    image.src = "https://www.neat.com/wp-content/uploads/2021/10/invoicetemplate.jpg";
    var canvas = document.getElementById('canvasAnimation') as HTMLCanvasElement;
    var ctx = canvas!.getContext('2d');

    image.onload = function () {


      ctx!.drawImage(
        image, 0, 0, 1000, 1000
      );

      cuandoTermine();

    }

  }
}



export class Point {
  x: number;
  y: number;
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}







