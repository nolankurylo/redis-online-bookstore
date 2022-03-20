const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL)

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

app.get('/', async (req, res) => {
    return res.send('Hello world');
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await client.connect()
    console.log(`Server listening on port ${PORT}`)
})