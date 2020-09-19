const express = require("express")

const router= express.Router()

router.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API...\m</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });


  module.exports=router