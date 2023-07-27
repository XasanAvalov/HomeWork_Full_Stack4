const Io = require("../utils/Io");
const Change = require("../models/Change");
const Users = new Io(process.cwd() + "/database/users.json")
const Changes = new Io(process.cwd() + "/database/history_change.json");

const change = async (req, res) => {
    const id1 = req.headers.authorization;
    const {id2, suma} = req.body;

    const changes = await Changes.read()
    const users = await Users.read()

    let findUser1 = users.find((user) => user.id == id1);
    let findUser2 = users.find((user) => user.id == id2);

    if(!findUser1 || !findUser2) return req.status(404).json({message: "404 NOT FOUND"});

    if(findUser1.balanc >= suma){
        findUser1.balanc -= suma;
        findUser2.balanc += suma;

        await Users.write(users)

        const newChange = new Change(id1, id2, suma);

        const result = changes.length ? [...changes, newChange] : [newChange]

        await Changes.write(result)

        res.status(201).json({message: "Success"})
    }else{
        res.status(400).json({message: "No mony"})
    }

}
module.exports = {change};