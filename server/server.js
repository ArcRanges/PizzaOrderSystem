"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataaccess = require("./DataAccess");
const PizzaData_1 = require("./PizzaData");
let accessObj = new dataaccess.PizzaDataAccess();
let app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
//Middleware setup
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
let orders = [];
let currentID = 100;
app.post('/postorder', cors(corsOptions), (req, res) => {
    let obj = req.body;
    // orders.push({receiptID: currentID, data: obj} );
    console.log(obj);
    console.log('order received');
    accessObj.insertEntry({ obj: obj, id: currentID }).then((response) => {
        res.send("" + currentID); // send receipt ID
        currentID++;
    }).catch((err) => {
        console.log("error inserting");
        res.status(404);
    });
});
app.get('/pizzaData1', cors(corsOptions), (req, res) => {
    res.send(JSON.stringify(PizzaData_1.PizzaData1));
    console.log("Data 1 sent!");
});
app.get('/pizzaData2', cors(corsOptions), (req, res) => {
    res.send(JSON.stringify(PizzaData_1.PizzaData2));
    console.log("Data 2 sent!");
});
app.get('/getorder', cors(corsOptions), (req, res) => {
    console.log("request received");
    console.log(req.query);
    // let requestID = req.query.id;
    // res.send((orders.find( orderObj => orderObj.receiptID == requestID)));
    // res.send(orders);
    let id = req.query.id;
    accessObj.getOrder(id).then((response) => {
        res.json({ order: response.find(order => order.id == id) });
    }).catch((err) => {
        res.status(404);
    });
});
accessObj.connect().then(() => {
    app.listen(4000, () => {
        console.log('Listening to port 4000');
    });
}).catch(() => {
    console.log("Failure to connect to the database.");
});
//# sourceMappingURL=server.js.map