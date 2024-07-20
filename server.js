require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const xml2js = require('xml2js')
const { query } = require('./mongodb')
const { subscribeToChannel } = require('./subscribe')

const app = express()
const port = process.env.PORT
const HUB_URL = process.env.HUB_URL



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

app.use(bodyParser.text({type: 'application/atom+xml'}))
// Endpoint to handle notifications (POST request)
app.post('/websub', (req, res) => {
    console.log('Notification received:', req.body);
    // Parse the XML data
    xml2js.parseString(req.body, { explicitArray: false }, (err, result) => {
        if (err) {
            console.error('Failed to parse XML:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Print the parsed XML data in a human-readable format
        console.log('Parsed XML data:', JSON.stringify(result, null, 2));
    });
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
async function main() {
    const TOPICS = await query()
    TOPICS.forEach(topic => subscribeToChannel(topic.youtubeChannelID, HUB_URL))



}

main()