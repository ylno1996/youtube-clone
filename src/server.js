import express from "express";

const PORT = 4000;

const app = express();

const handelHome = (req, res) => console.log("누군가가 집에 가려고 합니다.");

app.get("/", handelHome);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);


console.log("")