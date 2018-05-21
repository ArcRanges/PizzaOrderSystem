"use strict";
const Pizza_1 = require("./Pizza");
// pizza defaults
const TOPPINGS_OPTIONS = [new Pizza_1.PizzaTopping("Sausage", 2.6),
    new Pizza_1.PizzaTopping("Bacon", 1.8),
    new Pizza_1.PizzaTopping("Ham", 1.5),
    new Pizza_1.PizzaTopping("Pineapple", 2.4),
    new Pizza_1.PizzaTopping("Green Pepper", 2.5),
    new Pizza_1.PizzaTopping("Basil", 1.3)
];
const CRUST_OPTIONS = [new Pizza_1.PizzaCrust("Thin", 2.0),
    new Pizza_1.PizzaCrust("Normal", 0.001),
    new Pizza_1.PizzaCrust("Thick", 2.5)
];
const CHEESE_OPTIONS = [new Pizza_1.PizzaCheese("Small", 15.0),
    new Pizza_1.PizzaCheese("Medium", 20),
    new Pizza_1.PizzaCheese("Large", 25.0)
];
const TOPPINGS_OPTIONS2 = [new Pizza_1.PizzaTopping("Yellow Pepper", 2.6),
    new Pizza_1.PizzaTopping("Mushroom", 2.8),
    new Pizza_1.PizzaTopping("Turkey", 3.5),
    new Pizza_1.PizzaTopping("Apple", 2.5),
    new Pizza_1.PizzaTopping("Tea Leaves", 2.9),
    new Pizza_1.PizzaTopping("Onions", 2.3)
];
const CRUST_OPTIONS2 = [new Pizza_1.PizzaCrust("Extra thin", 1.0),
    new Pizza_1.PizzaCrust("Thin", 0.001),
    new Pizza_1.PizzaCrust("Ultra thin", 3.5)
];
const CHEESE_OPTIONS2 = [new Pizza_1.PizzaCheese("Small", 15.0),
    new Pizza_1.PizzaCheese("Extra", 35),
    new Pizza_1.PizzaCheese("Ultra", 45.0)
];
exports.PizzaData1 = { toppings: TOPPINGS_OPTIONS, crust: CRUST_OPTIONS, cheese: CHEESE_OPTIONS };
exports.PizzaData2 = { toppings: TOPPINGS_OPTIONS2, crust: CRUST_OPTIONS2, cheese: CHEESE_OPTIONS2 };
//# sourceMappingURL=PizzaData.js.map