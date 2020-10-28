var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
let cors=require('cors');
let mongodb=require('mongodb');
let mongoClient=mongodb.MongoClient;

router.use(bodyParser.json());

router.use(cors({
  origin:"*"
}));
router.get("/",function(req,res){
   res.send("This is LOGIN get route");
});
router.post("/",async function(req,res){
    try{
        let client=await mongoClient.connect(process.env.URL);
        console.log("Client Connected!");
        let db=client.db("srp");
        console.log("DB connected!");
        let singleUserData=await db.collection('userData').find({email:req.body.email}).toArray();
        if(singleUserData[0].password==req.body.password){
         res.json({
             "status":1,
             "id":singleUserData[0]._id
         });   
        }
        else{
            res.json({
                "status":0
            });
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router