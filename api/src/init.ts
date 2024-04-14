import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { MongoClient } from "mongodb";
import mongoose, { Schema, connect } from "mongoose";
import { hashPassword } from "./routes/ajax/register";

const { log } = console

expand(dotenv.config());


const uri = process.env.MONGO_URI + '/' + process.env.MONGO_NAME
log(uri)
const client = new MongoClient(uri);

async function createCollections() {
    await client.connect();
    const db = client.db(process.env.MONGO_NAME);
    const userCollection = await db.collection('users');
    // tạo user admin 
    const [username, password, role] = ["it", await hashPassword("123456"), "admin"]

    await userCollection.insertOne({ username, password, role });
}

createCollections()
    .catch(console.error)
    .finally(async () => {
        await client.close();
    });
