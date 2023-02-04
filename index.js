
////////////////////////////////////////////////////
////////  	   Migration SERVER     		    ///////
/////// convert mongo collection to csv     ///////
//////////////////////////////////////////////////
require('dotenv').config()
const {MongoClient} = require("mongodb")
const csv = require('csv')
const fs = require("fs");

let url = process.env.DB
const client = new MongoClient(url);
async function main() {
  
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

 
