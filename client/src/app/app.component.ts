import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { PizzaMenuComponent } from './pizza-menu.component';
import { OrderSummaryComponent } from './order-summary.component';
import { CurrentOrderComponent } from './current-order.component';
import { OrderService } from './orderService.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [OrderService]
})

export class AppComponent {

  storeName = 'Big Bang Pizza';

};
