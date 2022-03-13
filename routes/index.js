var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all client. */
router.get('/client', function (req, res, next) {
  var db = require('../db');
  var Client = db.Mongoose.model('client', db.ClientSchema, 'client');
  Client.find({}).lean().exec(function(e,docs){
     res.json(docs);
     res.end();
  });
});

/* GET ONE client. */
router.get('/client/:id', function (req, res, next) {
  var db = require('../db');
  var Client = db.Mongoose.model('client', db.ClientSchema, 'client');
  Client.find({ _id: req.params.id }).lean().exec(function (e, docs) {
      res.json(docs);
      res.end();
  });
});

/* POST ONE client. */
router.post('/client/', function (req, res, next) {
  var db = require('../db');
  var Client = db.Mongoose.model('client', db.ClientSchema, 'client');
  var newclient = new Client({ name: req.body.name, email: req.body.email });
  newclient.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newclient);
      res.end();
  });
});

/* PUT ONE client. */
router.put('/client/:id', function (req, res, next) {
  var db = require('../db');
  var Client = db.Mongoose.model('client', db.ClientSchema, 'client');
  Client.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

/* DELETE ONE client. */
router.delete('/client/:id', function (req, res, next) {
  var db = require('../db');
  var Client = db.Mongoose.model('client', db.ClientSchema, 'client');
  Client.find({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});

module.exports = router;