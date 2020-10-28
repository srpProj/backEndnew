var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
let mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
let cors=require('cors');

router.use(bodyParser.json());

router.use(cors({
  origin:"*"
}));
router.get("/",function(req,res){
   res.send("This is SIGNUP get route");
});
router.post("/",async function(req,res){
    console.log(req.body);
    try{
        let client=await mongoClient.connect(process.env.URL);
        console.log("Client Connected");
        let db=client.db('srp');
        console.log("DB connected");
        await db.collection('userData').insertOne({"fname":req.body.fname,"lname":req.body.lname,"email":req.body.email,"password":req.body.password,"dob":req.body.dob,"gender":req.body.gender})
        console.log("Data Inserted!");
        client.close();
        console.log("Connection closed!");
       res.json({
           "status":1
       });
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router