const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient({url: process.env.REDIS_URL})
const PORT = process.env.PORT || 3000
const path = require('path')
const bodyParser = require("body-parser");
var cors = require('cors')

app.use(cors())
app.use("/static", express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({ extended: true }))




app.get('/store/:key', async (req, res) => {
    const { key } = req.params
    const value = req.query 
    await client.set(key, JSON.stringify(value))
    return res.send('Success')
})

app.get('/get/:key', async (req, res) => {
    

    const { key } = req.params
    const rawData = await client.get(key);
    return res.json(JSON.parse(rawData))
})

app.get("/admin", async (req, res) => {
    var orders = await client.lRange("orders", 0, -1)

    console.log(orders)
    res.sendFile(__dirname + "/views/admin.html");
  });

app.get("/order", (req, res) => {
    res.sendFile(__dirname + "/views/orders.html");
  });

app.post("/order", async (req, res) => {
    console.log(req.body)
   
    var order = {
        book_name: req.body.book_name,
        customer_name: req.body.customer_name,
        quantity: req.body.quantity,
        total_price: `$${req.body.quantity}`,
        date: new Date()
    }
    console.log(order)

    await client.rPush("orders", JSON.stringify(order))
    res.send("Hello " + req.body.customer_name + ". Thank you for your purchase, we probably won't be in touch!");
});

// app.get('/store/:key', async (req, res) => {
//     const { key } = req.params
//     const value = req.query 
//     await redisClient.setAsync(key, JSON.stringify(value))
//     return res.send('Success')
// })

// app.get('/:key', async (req, res) => {
//     const { key } = req.params
//     const rawData = await redisClient.getAsync(key)
//     return res.json(JSON.parse(rawData))
// })






app.listen(PORT, async () => {
    await client.connect();
    console.log(`Server listening on port ${PORT}`)
})