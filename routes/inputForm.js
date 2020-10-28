// import express JS module into app 
// and creates its variable. 
var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
let cors=require('cors');
let mongodb=require('mongodb');
let mongoClient=mongodb.MongoClient;
let ObjectID=require('mongodb').ObjectID;
let dotenv=require('dotenv');
dotenv.config();
let url=`mongodb+srv://vikram:viki2000@cluster0.6e3ep.mongodb.net/srp?retryWrites=true&w=majority`
router.use(cors({
  origin:"*"
}));
router.use(bodyParser.json());

  
// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 


router.get("/",function(req,res){
    res.send("Welcome to the form input page!");
});
// Function callName() is executed whenever  
router.put('/', callName); 
  
async function callName(req, res) { 
try{
    console.log("Async function called");
    let userid=(req.body.id);
    console.log(userid);
    let client=await mongoClient.connect(processs.env.URL);
    console.log("Client Connected!");
    let db=client.db("srp");
    console.log("DB connected!");
    let updatedItem=await db.collection('userData').update({_id:ObjectID(userid)},{$set:{"age":req.body.age,"sex":req.body.sex,"cp":req.body.cp,"trestbps":req.body.trestbps,"chol":req.body.chol,"fbs":req.body.fbs,"restecg":req.body.restecg,"thalach":req.body.thalach,"exang":req.body.exang,"oldpeak":req.body.oldpeak,"slope":req.body.slope,"ca":req.body.ca,"thal":req.body.thal}});
    console.log(updatedItem);
    console.log('Updated DB');
    client.close();
    let one1=req.body.age;
    let two1=req.body.sex;
    let three1=req.body.cp;
    let four1=req.body.trestbps;
    let five1=req.body.chol;
    let six1=req.body.fbs;
    let seven1=req.body.restecg;
    let eight1=req.body.thalach;
    let nine1=req.body.exang;
    let ten1=req.body.oldpeak;
    let eleven1=req.body.slope;
    let twelve1=req.body.ca;
    let thirteen1=req.body.thal;
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    var process = spawn('python',["./test.py",one1,two1,three1,four1,five1,six1,seven1,eight1,nine1,ten1,eleven1,twelve1,thirteen1] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.json({
            "result":data.toString()
        }); 
    } ) 
}
catch(err){

}
} 
  
module.exports = router;
