const mongoose = require("mongoose");
//  We are switching to a replica set to
// https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker

mongoose.set("strictQuery", false);
const mongoDB =
    "mongodb://mh-inventory-mongo1:27017,mh-inventory-mongo2:27018,mh-inventory-mongo3:27019/MH-inventory-db?replicaSet=myReplicaSet";
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}
const conn = mongoose.connection;
conn.on("error", () => console.error.bind(console, "connection error"));

conn.once("open", () => console.info("Connection to Database is successful"));

module.exports = conn;
