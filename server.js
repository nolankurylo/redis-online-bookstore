const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient({url: process.env.REDIS_URL})
const PORT = process.env.PORT || 3000
const path = require('path')
const bodyParser = require("body-parser");
var cors = require('cors')
const es6Renderer = require('express-es6-template-engine')
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(cors())
app.use("/static", express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/admin", async (req, res) => {
    var orders = await client.lRange("orders", 0, -1)
    for(var i =0; i < orders.length; i++){
        orders[i] = JSON.parse(orders[i]) 
    }
    res.render('admin', {locals: {orders: orders}});
  });

app.get("/order", (req, res) => {
    res.render('orders');
  });

app.post("/order", async (req, res) => {
   
    var order = {
        book_name: req.body.book_name,
        author_name: req.body.author_name,
        customer_name: req.body.customer_name,
        quantity: req.body.quantity,
        total_price: `$${parseFloat(req.body.quantity) + 100.0}`,
        date: new Date()
    }

    await client.rPush("orders", JSON.stringify(order))
    res.redirect('/order_confirmed?order='+JSON.stringify(order));
});

app.get("/order_confirmed", async (req, res) => {
    res.render('order_confirmation', {locals: {order: JSON.parse(req.query.order)}});
});


app.listen(PORT, async () => {
    await client.connect();
    console.log(`Server listening on port ${PORT}`)
})