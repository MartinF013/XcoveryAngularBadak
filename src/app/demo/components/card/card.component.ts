import { Component, ElementRef, Input, Output } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { SharedDataService } from 'src/app/app/service/card.service';


const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];
@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(public layoutService: LayoutService, private sharedDataService: SharedDataService) { }



  resetCard() {
    document.getElementById('invoiceCard')!.style.visibility = 'hidden'
  }




  @Output()


  content!: string;

  onButtonClick() {
    const element = document.getElementById('cardInfo');

    if (element) {
      this.content = element.innerHTML;
      let lastMap = this.sharedDataService.sharedValueSource.getValue();

      switch (document.getElementById("cardTitle")!.textContent) {
        case 'Número de Factura':
          lastMap.set('invoiceNumber', this.content);

          break;
        case 'Fecha de Factura':
          lastMap.set('invoiceDate', this.content);
          console.log('Se manda a llamar el servicio');
          break;

        case 'Fecha de Vencimiento':
          lastMap.set('invoiceDueDate', this.content);
          console.log('Invoice Due Date');
          break;

        default:


      }

      this.sharedDataService.changeValue(lastMap);



      console.log(this.content);
    }
  }




}


