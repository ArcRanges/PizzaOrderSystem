import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from './orderService.service';

@Component ({
  selector: 'order-summary',
  template: `<fieldset class="form-group text-left">
              <legend>Your Pizza Orders: </legend>
              <div class="orderSummary text-center">
              <p>Total: </p>
              <input class="form-control text-center" disabled value= "$ {{orderService.getBill().toFixed(2)}}" /><br>
              <ol>
              <li *ngFor="let top of orderService.getPizzaList(); let i = index">
                Pizza {{i+1}} $ {{top.total.toFixed(2)}}
                <button type="button" #pizza value="{{i+1}}"
                (click)="orderService.removePizza(top)">remove</button>
              </li>
              <br>
              </ol>
              </div>
              <div class='text-center'>
              <div id="warning2"> </div>
                 <h4>Are you sure about this order?</h4>

              <button type='button' class='btn btn-success' (click)='submitCurrent()'>Submit Order</button>

              <router-outlet></router-outlet>
              </div>
             </fieldset>
            `

})

export class OrderSummaryComponent {

  constructor(private orderService: OrderService, private router: Router) { };

  submitCurrent() {
    if (this.orderService.pizzaList.length) {

      this.orderService.submitOrder().then((data:any)=> {
        console.log(data);
        this.orderService.newOrder();
        this.orderService.isLastOrderSuccess = true;
        this.router.navigate(['/finish', data]);

      }).catch(()=> {
        console.log("error getting ID");
      });

    }
    else {
      this.orderService.isLastOrderSuccess = false;
      this.orderService.warning("Please order at least one pizza.", 2);
    }

  }
}
