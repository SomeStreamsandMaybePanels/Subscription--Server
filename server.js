require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const xml2js = require('xml2js')
const { query } = require('./mongodb')
const { subscribeToChannel } = require('./subscribe')

const app = express()
const port = process.env.NOTIFICATION_SERVER_PORT
const HUB_URL = process.env.NOTIFICATION_HUB_URL

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Endpoint to handle subscription verification (GET request)
app.get('/websub', (req, res) => {
  const { 'hub.mode': mode, 'hub.topic': topic, 'hub.challenge': challenge, 'hub.lease_seconds': leaseSeconds } = req.query

  if (mode === 'subscribe' || mode === 'unsubscribe') {
    console.log(`Subscription mode: ${mode}, Topic: ${topic}, Lease Seconds: ${leaseSeconds}`)
    res.status(200).send(challenge)
  } else {
    res.status(400).send('Bad Request')
  }
})

// Endpoint to handle notifications (POST request)
app.post('/websub', (req, res) => {
  console.log('Notification received:', req.body)

  // Convert XML to JSON and send it to the parent process
  xml2js.parseString(req.body, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err)
      process.send({ error: 'Failed to parse XML' })
    } else {
      process.send({ data: result })
    }
  })

  res.status(200).send('OK')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
async function main () {
  const TOPICS = await query()
  TOPICS.forEach(topic => subscribeToChannel(topic.youtubeChannelID, HUB_URL))
}

main()
