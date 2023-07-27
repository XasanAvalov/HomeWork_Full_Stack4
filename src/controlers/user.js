const Io = require("../utils/Io");
const User = require("../models/User")
const Users = new Io(process.cwd() + "/database/users.json")

const registr = async (req, res) => {
    const {fullName} = req.body;

    const users = await Users.read();

    let FullNameUser = users.find((user) => user.fullName === fullName);

    if (FullNameUser) return res.status(400).json({message: "Already exists"});

    const id = (users[users.length - 1]?.id || 0) + 1;

    const newUser = new User(id, fullName);

    const result = users.length ? [...users, newUser] : [newUser];

    await Users.write(result);

    res.status(201).json({message: "CREATED"});
}

module.exports = {registr}