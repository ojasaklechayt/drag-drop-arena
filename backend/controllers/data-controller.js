const Data = require("../models/data-model");

// const postnewdata = async (req, res) => {
//     try {
//         const { username, firstname, lastname, age, email, country } = req.body;
//         const newData = new Data({ username, firstname, lastname, age, email, country });
//         await newData.save();
//         res.status(201).json(newData);
//     } catch (error) {
//         console.error("There is some error named: ", error);
//         res.status(500).json({ error: "Error creating user" });
//     }
// }

const postnewdata = async (req, res) => {
    try {
        const userDataArray = req.body.map((user) => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            email: user.email,
            country: user.country,
        }));

        const result = await Data.insertMany(userDataArray).lean();
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ error: "Error creating users" });
    }
}

const getalldata = async (req, res) => {
    try {
        const data = await Data.findOne().lean;
        const selectedFields = ["username", "firstname", "lastname", "age", "email", "country"];

        const filteredData = selectedFields.reduce((result, field) => {
            result[field] = data[field];
            return result;
        }, {});
        const users = Object.keys(filteredData);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting all the users");
        res.status(500).json({ error: "Error getting users" });
    }
};

const getcsvdata = async (req, res) => {
    try {
        const fieldName = req.body;
        const data = await Data.find({}, {...fieldName, _id: 0}).lean();
        res.status(200).json(data);
    } catch (error) {
        console.error("There is some error named: ", error);
        res.status(500).json({ error: "Error fetching CSV data" });
    }
};


module.exports = {
    postnewdata,
    getalldata,
    getcsvdata
};