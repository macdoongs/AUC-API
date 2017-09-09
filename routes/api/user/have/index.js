var express = require('express');
var router = express.Router();

var config = require('config.json')('./config/config.json');

var userModel = require('../../../../models/api/user.model');


/*
	GET

	Read have.
*/
router.get('/:email?', function(req, res, next) {
  var email = req.params.email || "";
  console.log('get have');

  if(email === ""){
    userModel.loadAllHave(function(error, resultObject){
    	res.json(resultObject);
    });
  }else{
    userModel.loadHaveByEmail(email, function(error, resultObject){
    	res.json(resultObject);
    });
  }

});


/*
	POST

	Create have.
*/
router.post('/', function(req, res, next) {
  var userId = req.body.userId || 0;
  var email = req.body.email;
  var deviceId = req.body.deviceId;

  console.log("Create have");

  if(userId === 0){
    userModel.addHaveByEmail(email, deviceId, function(error, resultObject){
    	res.json(resultObject);
    });
  }else{
    userModel.addHaveById(userId, deviceId, function(error, resultObject){
    	res.json(resultObject);
    });
  }


});

/*
	PUT

	Update have.
*/
router.put('/', function(req, res, next) {
  var haveId = req.body.haveId;
  var postUserId = req.body.postUserId;
  var postDeviceId = req.body.postDeviceId;

  var resultObject = new Object({});

  console.log("Update have");

  userModel.updateHave(haveId, postUserId, postDeviceId, function(error, resultObject){
    res.json(resultObject);
  });
});


/*
	DELETE

	Delete have.
*/
router.delete('/', function(req, res, next) {
  var haveId = req.body.haveId;

	console.log("Delete have");

  userModel.removeHave(haveId, function(error, resultObject){
    res.json(resultObject);
  });
});


module.exports = router;
