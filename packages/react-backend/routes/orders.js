var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

/* GET orders listing. */
router.get('/', function(req, res, next) {
  const orders = fs.readFileSync(path.resolve(__dirname, '../data/orders.json'), 'utf8');
  res.send(orders);
});

/* POST new order */
router.post('/create', function(req, res, next) {
  const orders = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/orders.json'), 'utf8'));  
  req.body.id = orders.length + 1;
  const newOrders = [...orders, req.body]
  // Write the modified obj to the file
  fs.writeFileSync(path.resolve(__dirname, '../data/orders.json'), JSON.stringify(newOrders), 'utf8')

  const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/items.json'), 'utf8'));
  const itemsFromOrder = req.body.order;
  itemsFromOrder.forEach(item => {
    const index = items.findIndex(el => el.id === item.id);
    items[index].inStore -= item.quantity;    
  });
  // Write the modified obj to the file
  fs.writeFileSync(path.resolve(__dirname, '../data/items.json'), JSON.stringify(items), 'utf8')
  res.send("ok");
});

module.exports = router;