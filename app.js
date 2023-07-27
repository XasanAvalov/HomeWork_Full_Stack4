const express = require("express");

const userRouter = require("./src/router/users.rotes");

const app = express();
app.use(express.json())
app.use(userRouter);

app.listen(4000, () =>{
    console.log(4000);
})
