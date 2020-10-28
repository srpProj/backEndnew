var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
let cors=require('cors');
router.use(cors({
  origin:"*"
}));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Index Page");
});

module.exports = router;
