import { Component, Input } from '@angular/core';

import { OrderService } from './orderService.service';

@Component ({
  selector: 'current-order',
  templateUrl: 'currentOrder.html'
})

export class CurrentOrderComponent {

	constructor(private orderService: OrderService) {  };

  addPizza() {
  	// only add the pizza if it's not an EMPTY pizza
  	if (this.orderService.getCurrentPizza().total != 0) {
  		let currentPizza = this.orderService.getCurrentPizza();
	    this.orderService.addPizza();
	    this.orderService.render();
	    this.orderService.setState(false);
  	}
    else {
    	this.orderService.warning("You must choose at least one option.", 1);
    }
  }
}
