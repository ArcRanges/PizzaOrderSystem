"use strict";
// Data Access object file 
// for accessing menu items and 
const mongodb = require("mongodb");
let mongoClient = mongodb.MongoClient;
class PizzaDataAccess {
    constructor(connectionString) {
        this.collectionName = "order";
        this.connectionString = 'mongodb://localhost:27017/orders';
        this.URL = connectionString || this.connectionString;
    }
    get URL() {
        return this.connectionString;
    }
    ;
    set URL(newURL) {
        this.connectionString = newURL;
    }
    ;
    // connects to the mongo database
    connect() {
        if (this.dbConnection) {
            return this.dbConnection;
        }
        else {
            this.dbConnection = new Promise((resolve, reject) => {
                mongoClient.connect(this.URL, (err, db) => {
                    if (!err) {
                        console.log("We are connected");
                        // console.log(db);
                        resolve(db);
                    }
                    else {
                        reject(err);
                        console.log("Error connection");
                    }
                });
            });
            return this.dbConnection;
        }
    }
    // inserts an order to the database
    insertEntry(entry) {
        return new Promise((resolve, reject) => {
            this.dbConnection.then((db) => {
                db.collection(this.collectionName).insertOne(entry, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            }).catch((err) => {
                reject(err);
                console.log("Cannot add object");
            });
        });
    }
    // retrieve entries from the database
    getOrder(orderID) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                // collectionName = "menu"
                db.collection(this.collectionName).find({}).toArray((err, entry) => {
                    if (!err) {
                        resolve(entry);
                    }
                    else {
                        reject(err);
                    }
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
exports.PizzaDataAccess = PizzaDataAccess;
//# sourceMappingURL=DataAccess.js.map