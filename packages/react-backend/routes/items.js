var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

/* GET items listing. */
router.get('/', function(req, res, next) {
  const items = fs.readFileSync(path.resolve(__dirname, '../data/items.json'), 'utf8');
  res.send(items);
});

module.exports = router;
