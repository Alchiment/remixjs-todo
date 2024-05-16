import { MongoClient } from "mongodb";
import 'dotenv/config';

const strConnection = process.env.URL_DB || '';
const dbName = process.env.DB_NAME || '';
const client = new MongoClient(strConnection);
let conn;

async function openConnection() {
    if (conn) { return conn; }
    conn = (await client.connect()).db(dbName);
}

async function getConnection() {
    return conn;
}

const connection = {
    openConnection,
    getConnection
}

export default connection;