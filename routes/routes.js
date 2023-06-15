const express = require("express")
const router = express.Router();

router.get('/hello',(req,res)=>
{
    res.send("Hello World")
})

router.post('/', (req, res)=> {
    const {data} = req;
    console.log(req.body.name);
  res.send('POST request to the homepage')
})

 module.exports = router;