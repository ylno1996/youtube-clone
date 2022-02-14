import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/cloning");

const db = mongoose.connection;

const openingDB =() => console.log("DB에 연결됨");

db.on("error", (err) => console.log("DB ERROR", err));
db.once("open", openingDB);