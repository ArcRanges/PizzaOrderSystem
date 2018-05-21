import { PizzaCrust, PizzaTopping, PizzaCheese } from './Pizza';


// pizza defaults
const TOPPINGS_OPTIONS: Array<PizzaTopping> = [ new PizzaTopping("Sausage", 2.6),
                                        new PizzaTopping("Bacon", 1.8),
                                        new PizzaTopping("Ham", 1.5),
                                        new PizzaTopping("Pineapple", 2.4),
                                        new PizzaTopping("Green Pepper", 2.5),
                                        new PizzaTopping("Basil", 1.3)
                                      ];
const CRUST_OPTIONS: Array<PizzaCrust> = [ new PizzaCrust("Thin", 2.0),
                                    new PizzaCrust("Normal", 0.001),
                                    new PizzaCrust("Thick", 2.5)
                                  ];
const CHEESE_OPTIONS: Array<PizzaCheese> = [ new PizzaCheese("Small", 15.0),
                                    new PizzaCheese("Medium", 20),
                                    new PizzaCheese("Large", 25.0)
                                  ];

const TOPPINGS_OPTIONS2: Array<PizzaTopping> = [ new PizzaTopping("Yellow Pepper", 2.6),
                                        new PizzaTopping("Mushroom", 2.8),
                                        new PizzaTopping("Turkey", 3.5),
                                        new PizzaTopping("Apple", 2.5),
                                        new PizzaTopping("Tea Leaves", 2.9),
                                        new PizzaTopping("Onions", 2.3)
                                      ];
const CRUST_OPTIONS2: Array<PizzaCrust> = [ new PizzaCrust("Extra thin", 1.0),
                                    new PizzaCrust("Thin", 0.001),
                                    new PizzaCrust("Ultra thin", 3.5)
                                  ];
const CHEESE_OPTIONS2: Array<PizzaCheese> = [ new PizzaCheese("Small", 15.0),
                                    new PizzaCheese("Extra", 35),
                                    new PizzaCheese("Ultra", 45.0)
                                  ];
export const PizzaData1 = {toppings: TOPPINGS_OPTIONS, crust: CRUST_OPTIONS, cheese: CHEESE_OPTIONS} ;

export const PizzaData2 = {toppings: TOPPINGS_OPTIONS2, crust: CRUST_OPTIONS2, cheese: CHEESE_OPTIONS2} ;