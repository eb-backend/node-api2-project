const express = require('express');

const userRouter=require("./blog/blog-router")
const userWelcome=require("./welcome/blog-welcome")

const server = express();

server.use(express.json());
server.use(userRouter)
server.use(userWelcome)




// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4400, () => {
  console.log('\n*** server Running on http://localhost:4400 ***\n');
});
