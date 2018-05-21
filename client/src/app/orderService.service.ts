import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Pizza, PizzaCrust, PizzaTopping, PizzaCheese } from './Pizza';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable() export class OrderService {

	currentPizza: Pizza;
	pizzaList: Pizza[];
	state: boolean;
	orderCount: number;
	isLastOrderSuccess: boolean;

	crustOptions: PizzaCrust[];
	cheeseOptions: PizzaCheese[];
	toppingOptions: PizzaTopping[];

	constructor( private netConnect: Http, private router:Router, private jsonp: Jsonp) {
		this.currentPizza = new Pizza( new PizzaCrust("",0),new Array<PizzaTopping>(), new PizzaCheese("", 0), 0);
		this.pizzaList  = new Array<Pizza>();
		this.crustOptions = [];
		this.cheeseOptions = [];
		this.toppingOptions = [];
		this.state = true;
		this.isLastOrderSuccess = false;
		this.orderCount = 0;
	}

	// resets everything to default
	// to start a new order
	newOrder() {
		this.render();		// clear forms
		this.pizzaList  = new Array<Pizza>(); // empty pizza list
	}

	// receives list of orders from the server
	findOrder(id: string){
		let url = 'http://localhost:4000/getorder';

		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);

		let requestOptions = new RequestOptions();
		requestOptions.search = params;

		return this.netConnect
               .get(url, requestOptions).toPromise()
               .then(res => {
								 console.log(res.json());
								return res.json().order;
							});
	}

	// sends the order to the server
	submitOrder() : Promise<string>{
		let URL = 'http://localhost:4000/postorder';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });


		let order = {
			orders: this.pizzaList,
			total: this.getBill(),
		}
		let responder = function(response: any) {
			console.log("success!\nfrom server:" + response);

			return response._body;
		}
		console.log('submitting order');
		this.orderCount++;
		return this.netConnect.post(URL, order, options).toPromise()
		.then(responder)
		.catch(()=>{
			console.log("error submitting order");
			return Promise.reject("error2");
		});
	}

	// get data from server
	getDataFromServer(endpoint) : Promise<string> {
		let url = "http://localhost:4000/" + endpoint;

		let handleSuccess = (response: any) => {
			return response.json();
		}
		let handleError = (error: any) => {
			return Promise.reject("error getting pizza data");
		}
		return this.netConnect.get(url).toPromise().then(handleSuccess).catch(handleError);
	}

	// show warning when pizza has a chance of not cooking
	warning(msg: string, warningObject: number) {
		let warningObj = document.getElementById('warning'+ warningObject);

		// show warning message only if msg is not empty
		if (msg !== "") {
			warningObj.innerHTML = "<p class='alert alert-warning'><strong>Warning:</strong> " + msg + "</p>";
		}
		else {
			warningObj.innerHTML = "";
		}
	}

	// resets the forms and current pizza to defaults
	render() {
		this.resetForms();
		this.currentPizza = new Pizza( new PizzaCrust("",0), new Array<PizzaTopping>(), new PizzaCheese("", 0), 0);
	}

	// resets the forms on the menu
	resetForms() {
		let forms = ["crust-form", "topping-form", "cheese-form"];

		// reset forms to defaults
		for (let i = 0; i < forms.length; i++) {
			let form = <HTMLFormElement>document.getElementById(forms[i]);
			form.reset();
		}
		this.warning("", 1);
		this.warning("", 2);
	}

	// remove the pizza from the order list
	removePizza(id: Pizza) {

		let index = this.pizzaList.indexOf(id, 0);
		if (index > -1) {
			this.pizzaList.splice(index, 1);
		}
	}

	// returns total amount to be paid
	getBill() : number {
		let sum : number = 0;

		for (let pizza of this.pizzaList) {
			sum+= pizza.total;
		}

		return sum;
	}

	setCurrentPizza(pizza: Pizza) {
		this.currentPizza = pizza;
	}

	setState(state: boolean) {
		this.state = state;
	}

	addPizza() {
		this.pizzaList.push(this.currentPizza);
	}

	getCurrentPizza() : Pizza {
		return this.currentPizza;
	}

	getPizzaList() : Pizza[] {
		return this.pizzaList;
	}
}
