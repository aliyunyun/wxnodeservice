
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/users', router);
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/aa',function(req,res,next){
  res.send('hello express');
})

