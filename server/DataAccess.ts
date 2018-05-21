// Data Access object file 
// for accessing menu items and 
import mongodb  = require('mongodb');
let mongoClient = mongodb.MongoClient;

export class PizzaDataAccess {

	private dbConnection: Promise<any>;
	private collectionName = "order"
	private connectionString = 'mongodb://localhost:27017/orders'

	constructor(connectionString?: string) {
		this.URL = connectionString || this.connectionString;
	}

	get URL() {
		return this.connectionString;
	};
	set URL(newURL) {
		this.connectionString = newURL;
	};

	// connects to the mongo database
	connect(): Promise<any> {
		if (this.dbConnection) {
			return this.dbConnection;
		} else {
			this.dbConnection = new Promise<any>((resolve, reject) => {
				mongoClient.connect(this.URL, (err: any, db: any) => {
					if (!err) {
						console.log("We are connected");
						// console.log(db);
						resolve(db);
					} else {
						reject(err);
						console.log("Error connection");
					}
				});
			});
			return this.dbConnection;
		}
	}
	
	// inserts an order to the database
	insertEntry(entry: any): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.dbConnection.then((db: any) => {
				db.collection(this.collectionName).insertOne(entry, (err: any, result: any) => {
					if(!err) {
						resolve(result);
					} else {
						reject(err);
					}
				})
			}).catch((err) => {
				reject(err);
				console.log("Cannot add object");
			})
		})
	}

	// retrieve entries from the database
	getOrder(orderID: any): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.connect().then((db: any) => {
				// collectionName = "menu"
				db.collection(this.collectionName).find({}).toArray((err: any, entry: any) => {
					if (!err) {
						resolve(entry);
					} else {
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