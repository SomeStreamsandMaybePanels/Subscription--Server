const express = require('express')
const bodyParser = require('body-parser')
const readline = require('readline')
const { query } = require('./mongodb')
const { subscribeToChannel } = require('./subscribe')

const app = express()
const port = 3000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Endpoint to handle subscription verification (GET request)
app.get('/websub', (req, res) => {
    const { 'hub.mode': mode, 'hub.topic': topic, 'hub.challenge': challenge, 'hub.lease_seconds': leaseSeconds } = req.query;

    if (mode === 'subscribe' || mode === 'unsubscribe') {
        console.log(`Subscription mode: ${mode}, Topic: ${topic}, Lease Seconds: ${leaseSeconds}`);
        res.status(200).send(challenge);
    } else {
        res.status(400).send('Bad Request');
    }
})

// Endpoint to handle notifications (POST request)
app.post('/websub', (req, res) => {
    console.log('Notification received:', req.body);
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
async function main() {
    rl.question("Enter your ngrok public URL:", async (answer) => {
        const HUB_URL = answer
        const TOPICS = await query()
        TOPICS.forEach(topic => subscribeToChannel(topic.youtubeChannelID, HUB_URL))

    })

}

main()