// the whole pizza model class
"use strict";
class Pizza {
    constructor(crust, toppings, cheese, total) {
        this.crust = crust;
        this.toppings = toppings;
        this.cheese = cheese;
        this.total = total;
    }
}
exports.Pizza = Pizza;
// pizza model for crust types
class PizzaCrust {
    constructor(type, price) {
        this.type = type;
        this.price = price;
    }
}
exports.PizzaCrust = PizzaCrust;
// pizza model for a topping
class PizzaTopping {
    constructor(type, price) {
        this.type = type;
        this.price = price;
    }
}
exports.PizzaTopping = PizzaTopping;
// pizza model for crust size
class PizzaCheese {
    constructor(size, price) {
        this.type = size;
        this.price = price;
    }
}
exports.PizzaCheese = PizzaCheese;
//# sourceMappingURL=Pizza.js.map