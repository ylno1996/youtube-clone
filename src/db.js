import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const openingDB =() => console.log("DB에 연결됨");

db.on("error", (err) => console.log("DB ERROR", err));
db.once("open", openingDB);