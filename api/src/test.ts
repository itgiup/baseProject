import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { MongoClient } from "mongodb";
import mongoose, { Schema, connect } from "mongoose";

const { log } = console

expand(dotenv.config());




const uri = process.env.DATABASE_URL
log(uri)
const client = new MongoClient(uri)//, { useNewUrlParser: true, useUnifiedTopology: true });

async function testConnection() {

    await client.connect()
    const db = client.db("baseProject");
    console.log('Kết nối đến MongoDB thành công');
    const users = db.collection('users');
    const MyModel = mongoose.model('users', new Schema({ username: String, password: String }));
    // Works
    const findResult = await users.find({}).toArray()
    log(findResult)


}
 
testConnection()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());  