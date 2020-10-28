var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
let cors=require('cors');
let ObjectId=require('mongodb').ObjectId

router.use(bodyParser.json());

router.use(cors({
  origin:"*"
}));
router.get("/",function(req,res){
   res.send("This is Dashboard get route");
});
router.post("/",async function(req,res){
   try{
      let client=await mongoClient.connect(process.env.URL);
      console.log("Client Connected");
      let db=client.db('srp');
      console.log("DB Connected!");
      let userInfo=await db.collection('userData').find({_id:ObjectId(req.body.id)}).toArray();
      client.close();
      console.log(userInfo[0]);
      res.json(userInfo[0]);
   }
   catch(err){
        console.log(err);
   }

});

module.exports=router