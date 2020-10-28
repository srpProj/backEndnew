// import express JS module into app 
// and creates its variable. 
var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
let cors=require('cors');
let mongodb=require('mongodb');
let mongoClient=mongodb.MongoClient;
let ObjectID=require('mongodb').ObjectID;
router.use(cors({
  origin:"*"
}));
router.use(bodyParser.json());


router.get("/",function(req,res){
    console.log("Table elements GET route");
});

router.post("/",async function(req,res){
  try{
    console.log("Async function called");
    let userid=(req.body.id);
    console.log(userid);
    let client=await mongoClient.connect(process.env.URL);
    console.log("Client Connected!");
    let db=client.db("srp");
    console.log("DB connected!");
    let foundItem=await db.collection('userData').findOne({_id:ObjectID(userid)});
    console.log(foundItem);
    let newData={
        "age":foundItem.age,
        "sex":foundItem.sex,
        "cp":foundItem.cp,
        "trestbps":foundItem.trestbps,
        "chol":foundItem.chol,
        "fbs":foundItem.fbs,
        "restecg":foundItem.restecg,
        "thalach":foundItem.thalach,
        "exang":foundItem.exang,
        "oldpeak":foundItem.oldpeak,
        "slope":foundItem.slope,
        "ca":foundItem.ca,
        "thal":foundItem.thal
    }
    console.log('Updated DB');
    client.close();
    res.json(newData);
  }
  catch(err){

  }
});

module.exports=router