const Data = require("../models/data-model");

const postnewdata = async(req, res) => {
    try {
        const {username,firstname,lastname,age,email,country} = req.body;
        const newData = new Data({username,firstname,lastname,age,email,country});
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        console.error("There is some error named: ",error);
        req.status(500).send("Error Creating User");
    }
}

const getalldata = async (req,res) => {
    try {
        const data = await Data.find();
        const extractedData = data.map(item => {
            return {
                username: item.username,
                firstname: item.firstname,
                lastname: item.lastname,
                age: item.age,
                email: item.email,
                country: item.country
            };
        });
        const valuesOnlyData = extractedData.map(item => Object.values(item));
        res.status(200).json(valuesOnlyData);
    } catch (error) {
        console.error("Error getting all the users");
        req.status(500).send("Error Getting Users");
    }
};

module.exports = {
    postnewdata,
    getalldata,
};