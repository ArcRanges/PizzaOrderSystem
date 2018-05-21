import { Component, Input } from '@angular/core';

import { OrderService } from './orderService.service';

@Component ({
  selector: 'find-order',
  template: `<hr><div style="margin-left: 25%; margin-right: 25%;"><p>Input Receipt ID:</p><br>
  			<input #finder type='number' (keyup)='getOrderDetails(finder.value)' (click)='getOrderDetails(finder.value)' value='99999'><hr>
  			<div style="width: 350px;">
          <div>
            <h3>For Order ID: {{receiptID}}</h3>
            <h4>Order Total: $ {{ordersTotal.toFixed(2)}}</h4><hr>
            <h5>Order details</h5>
          </div>
          <ol class="well" *ngFor="let order of currentOrders; let i = index">
            <h5 class='text-center'>Pizza {{i+1}}</h5><hr>
            <p>Crust type : {{order.crust.type}}</p>
            <p>Toppings:</p>
            <ul>
              <li *ngFor="let topping of order.toppings">
                {{topping.type}} {{topping.price.toFixed(2)}}
              </li>
            </ul>
            <p>Cheese type: {{order.cheese.type}}</p>
            Pizza total:
            <input maxlength="10" class="form-control text-center" value='$ {{order.total.toFixed(2)}}'>
          </ol>
          <hr>
  			</div>

  			</div> `
})

export class QueryingComponent {
	constructor(private orderService: OrderService) {}
  currentOrders: any[] = [];
  ordersTotal: number = 0;
  receiptID: number = 0;

  // resets order details on the QueryingComponent
  resetOrders() {
    this.currentOrders = [];
    this.ordersTotal = 0;
    this.receiptID = 0;
  }
  // gets an order from the database using linear search
	getOrderDetails(input: any) {
    this.orderService.findOrder(input).then((res: any)=> {
      this.receiptID = res.id;
      this.currentOrders = res.obj.orders;
      this.ordersTotal = res.obj.total;
      return res;
    })
    .catch(()=> {
      this.resetOrders();
      console.log('order not found');
    });
	}

}
