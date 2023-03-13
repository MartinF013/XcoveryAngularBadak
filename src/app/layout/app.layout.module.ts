import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { PreviewComponent } from './preview/preview.component';
import { SidebarPreviewComponent } from './preview/sidebar-preview/sidebar-preview.component';
import { MatCardModule } from '@angular/material/card'; // anadi la importacion para poder utilizar cards
// installe en el cli angular Material para poder hacer la importacion
import { MatButtonModule } from '@angular/material/button'; // para usar el boton en card de material
import { CardComponent } from '../demo/components/card/card.component';

// importaciones de NG ZORRO 
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon'; 
import { CheckCircleOutline, CloseCircleOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ CheckCircleOutline, CloseCircleOutline];



@NgModule({
    declarations: [
        CardComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        PreviewComponent,
        SidebarPreviewComponent,
    ],
    imports: [
        MatButtonModule,// para usar el boton en la card 
        MatCardModule, // anadi Mat card module aqui para poder utilizarla en el preview 
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        NzIconModule.forRoot(icons),
        
    ],
    exports: [AppLayoutComponent, ]
})
export class AppLayoutModule { }
