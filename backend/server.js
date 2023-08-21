const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRouter = require('./routes/data-router');
const app = express();
const port = 3000;

async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/datas", {
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
