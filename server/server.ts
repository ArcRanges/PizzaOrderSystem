
import express  = require("express");
import cors = require('cors');
import bodyParser = require('body-parser');
import dataaccess = require('./DataAccess');
import { PizzaData1, PizzaData2 } from './PizzaData';

let accessObj = new dataaccess.PizzaDataAccess();
let app=express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}


//Middleware setup
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json

let orders : Array<any> = [];
let currentID: number = 100;

app.post('/postorder', cors(corsOptions), (req: any, res: any)=> {
  let obj = req.body;
  // orders.push({receiptID: currentID, data: obj} );

  console.log(obj);
  console.log('order received');
  accessObj.insertEntry({obj: obj, id: currentID}).then(( response: any) => {

    res.send(""+ currentID); // send receipt ID
    currentID++;
  }).catch((err: any) => {
    console.log("error inserting");
    res.status(404);
  });


})

app.get('/pizzaData1', cors(corsOptions), (req:any,res:any)=>{

  res.send(JSON.stringify(PizzaData1));

  console.log("Data 1 sent!");

})

app.get('/pizzaData2', cors(corsOptions), (req:any,res:any)=>{

  res.send(JSON.stringify(PizzaData2));

  console.log("Data 2 sent!");
})

app.get('/getorder', cors(corsOptions), (req:any, res:any)=>{
  console.log("request received");
  console.log(req.query);

  // let requestID = req.query.id;
  // res.send((orders.find( orderObj => orderObj.receiptID == requestID)));
  // res.send(orders);
  let id = req.query.id;
  accessObj.getOrder(id).then((response: any) => {
    res.json({order: response.find(order => order.id == id)});
  }).catch((err: any) => {
    res.status(404);
  });
})

accessObj.connect().then(() => {
  app.listen(4000, ()=>{
    console.log('Listening to port 4000');
  })
}).catch(() => {
  console.log("Failure to connect to the database.");
})

