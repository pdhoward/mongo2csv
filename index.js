
////////////////////////////////////////////////////
////////  	   Migration SERVER     		    ///////
/////// convert mongo collection to csv     ///////
//////////////////////////////////////////////////
require('dotenv').config()
const {MongoClient} = require("mongodb")
const csv = require('csv')
const fs = require("fs");
//const ws = fs.createWriteStream("product.csv");

// let url = "mongodb://username:password@localhost:27017/";
let url = process.env.DB
const client = new MongoClient(url);
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();
  const product = db.collection('product');
  const cursor = product.find({});
  await cursor.forEach(doc => {
      csv.stringify([doc], {header: false}, (err, output) => {
        fs.appendFileSync("product.csv", output);
        
      });
    })
  return 'done'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

 
