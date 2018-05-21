import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './orderService.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component ({
  selector: 'order-result',
  template: `<div class="text-center"><hr><p id="order-success"></p>
  			<button type="button" class="btn btn-primary" (click)="goBack()">Go Back</button></div>`
})

export class OrderResultComponent implements OnInit {
	constructor(
		private orderService: OrderService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	private sub: any;
	receiptID: number;

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.receiptID = +params['receiptID'];
		})
		this.showReceipt();
	}
  
	showReceipt() {
		let successObj = document.getElementById('order-success');
		if (this.orderService.isLastOrderSuccess) {
			// order success
			// show message + receipt
			let message = "Your order has been successfully placed!<br> Receipt ID:" + this.receiptID;
			successObj.innerHTML = message;
		}
		else {
			successObj.innerHTML = "Order Error. You have not been charged.";
		}
	}
	goBack() {
		this.location.back();
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
