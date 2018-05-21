// the whole pizza model class

export class Pizza {
  crust: PizzaCrust;
  toppings: PizzaTopping[];
  cheese: PizzaCheese;
  total: number;

  constructor(crust: PizzaCrust, toppings: PizzaTopping[], cheese: PizzaCheese, total: number) {
    this.crust = crust;
    this.toppings = toppings;
    this.cheese = cheese;
    this.total = total;
  }
}
// pizza model for crust types
export class PizzaCrust {
  type: string;
  price: number;

  constructor(type: string, price: number) {
    this.type = type;
    this.price = price;
  }
}
// pizza model for a topping
export class PizzaTopping {
  type: string;
  price: number;

  constructor(type: string, price: number) {
    this.type = type;
    this.price = price;
  }
}
// pizza model for crust size
export class PizzaCheese {
  type: string;
  price: number;

  constructor(size: string, price: number) {
    this.type = size;
    this.price = price;
  }
}
