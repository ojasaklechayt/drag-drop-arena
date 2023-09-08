const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dataRouter = require('./routes/data-router');
const templateRouter = require('./routes/template-router');

dotenv.config();
const app = express();
const port = 3000;

const Mongodb_Link = process.env.MONGODB_LINK;

async function main() {
    try {
        await mongoose.connect(Mongodb_Link, {
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
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

app.use("/data",cors(), dataRouter);
app.use('/',cors(), templateRouter);

app.listen(port, () => {
    console.log("Connected to the server at the port:", port);
});