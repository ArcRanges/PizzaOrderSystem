import { Component, Input } from '@angular/core';

import { Pizza, PizzaCrust, PizzaTopping, PizzaCheese} from './Pizza';
import { OrderService } from './orderService.service';

@Component ({
  selector: 'pizza-menu',
  templateUrl: 'pizzaMenu.html'
})

export class PizzaMenuComponent {

  crustOptions: PizzaCrust[] = [];
  toppingsOptions: PizzaTopping[] = [];
  cheeseOptions: PizzaCheese[] = [];

  crust: PizzaCrust = new PizzaCrust("", 0);
  toppings: PizzaTopping[] = new Array<PizzaTopping>();
  cheese: PizzaCheese = new PizzaCheese("", 0);

  total: number = 0;

  constructor(private orderService: OrderService) { };

  // processes the data received from the server.
  loadData(data: any) {

    this.resetCurrentChoices();
    this.newPizza();

    let crusts = data.crust;
    let toppings = data.toppings;
    let cheeses = data.cheese;

    for (let i = 0; i < crusts.length; i++ ) {
      this.crustOptions.push(new PizzaCrust(crusts[i].type, crusts[i].price));
    }
    for (let i = 0; i < toppings.length; i++ ) {
      this.toppingsOptions.push(new PizzaTopping(toppings[i].type, toppings[i].price));
    }
    for (let i = 0; i < cheeses.length; i++ ) {
      this.cheeseOptions.push(new PizzaCheese(cheeses[i].type, cheeses[i].price));
    }
  }

  // reset current chosen menu data, if there's any
  resetCurrentChoices() {
    this.orderService.render();

    // reset ingredients arrays for each menu
    this.crustOptions = [];
    this.toppingsOptions = [];
    this.cheeseOptions = [];
  }

  // load menu choices for ingredients.
  loadMenu(endpoint: string) {
		this.orderService.getDataFromServer(endpoint).then (( data: any) => {
      this.loadData(data);
    }).catch ( () => {
      console.log("error getting menu");
    });
	}

  // resets pizza to defaults
  newPizza() {
    this.crust = new PizzaCrust("", 0);
    this.toppings = new Array<PizzaTopping>();
    this.cheese = new PizzaCheese("", 0);
    this.total = 0;
  }
  // updates the current pizza order
  updateOrder() {
    // if state is true, pizza has NOT been added,
    // then, set current pizza, otherwise pizza is new
    if (!this.orderService.state) {
      this.orderService.setState(true);
      this.newPizza();
    }
    this.orderService.setCurrentPizza(new Pizza(this.crust, this.toppings, this.cheese, this.total));
    this.total = this.getTotal();
    // console.log(currentPizza);
  }

  // check if quantity of toppings exceed 10
  isMaxQuantity(toppings: any) {
    let sum: number = 0;
    const LIMIT: number = 10;

    for (let i = 0; i < toppings.length; i++) {
      let quantity = Number(toppings[i].value);
      sum += quantity;
    }
    return sum > LIMIT;
  }

  // returns the total price to be paid
  getTotal() {
    let totalPrice: number = 0;
    totalPrice += this.crust.price;  // add the crust price
    totalPrice += this.cheese.price; // add the cheese price

    // add the selected toppings' prices to the total
    for(let i = 0 ; i < this.toppings.length; i++) {
      totalPrice += this.toppings[i].price;
    }
    return totalPrice;
  }

  // update crust interface
  updateCrust(crustType: any) {
    let crustElements = crustType.getElementsByTagName("input");

    for (let i = 0; i < crustElements.length; i++) {

      if (crustElements[i].checked) {
        let aCrust = crustElements[i].value;
        let currentCrust = this.crustOptions.find( item => item.type == aCrust);
        this.crust = new PizzaCrust(currentCrust.type, currentCrust.price);
      }
    }
     this.updateOrder();
  }

  // update topping interface
  updateTopping(topping: any) {
    let toppingElements = topping.getElementsByTagName("input");
    let msg: string = "";
    this.toppings = [];

    // if maximum quantity has been reached, show warning
    if (this.isMaxQuantity(toppingElements)) {
      msg = "You've input more than 10 ingredients. <br>Your pizza may not cook.";
    }
    this.orderService.warning(msg, 1);

    for (let i = 0; i < toppingElements.length; i++) {

      // find the element that is valid
      let quantity = toppingElements[i].value;

      if (quantity != 0) {
        let aTopping = toppingElements[i].name; // get the topping html element
        let currentTopping = this.toppingsOptions.find( item => item.type == aTopping);

        // change price of topping based on quantity
         this.toppings.push(new PizzaTopping(currentTopping.type, currentTopping.price * quantity));
      }
    }
     this.updateOrder();
    // console.log(this.toppings);
  }

  // update cheese interface
  updateCheeseType(cheeseType: any) {
    let cheeseElements = cheeseType.getElementsByTagName("input");

    for (let i = 0; i < cheeseElements.length; i++) {

      if (cheeseElements[i].checked) {
        let aCheese = cheeseElements[i].value;
        let currentCheese = this.cheeseOptions.find( item => item.type == aCheese);
        this.cheese = new PizzaCheese(currentCheese.type, currentCheese.price);
      }
    }
     this.updateOrder();
    // console.log(this.cheese);
  }
}
