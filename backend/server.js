const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv').config();
const dataRouter = require('./routes/data-router');
const app = express();
const port = 3000;

const Mongodb_Link = process.env.MONGODB_LINK;

async function main() {
    try {
        await mongoose.connect("mongodb+srv://ojasaklechayt:sdtb2TZpGeHZFetp@cluster0.hjephix.mongodb.net/?retryWrites=true&w=majority/datas", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the MongoDB");
    } catch (error) {
        console.error("Database Error:", error);
    }
}

main();

app.use(express.json());
app.use(cors())

app.use("/data",cors(), dataRouter);

app.get('/',cors(), (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Connected to the server at the port:", port);
});
