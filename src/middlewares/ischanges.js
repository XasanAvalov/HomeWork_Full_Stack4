const Io = require("../utils/Io");
const Users = new Io(process.cwd() + "/database/users.json")

const ischanges = async (req, res, next) => {
    const userId = req.headers.authorization;

    const users = await Users.read();
    const findUser = users.find((user) => user.id == userId);

    if(findUser){
        req.user = findUser;
        next();
    } 
    else res.status(403).json({message: "User Not Found"});  
};
module.exports = ischanges;