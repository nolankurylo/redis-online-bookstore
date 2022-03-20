const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL)
const redisClient = require('./redis-client')
const PORT = process.env.PORT || 3000
const path = require('path')
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }))




app.get('/store/:key', async (req, res) => {
    const { key } = req.params
    const value = req.query 
    await client.set(key, JSON.stringify(value))
    return res.send('Success')
})

app.get('/:key', async (req, res) => {
    

    const { key } = req.params
    const rawData = await client.get(key);
    return res.json(JSON.parse(rawData))
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/orders.html");
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
    await client.connect()
    console.log(`Server listening on port ${PORT}`)
})