const axios = require('axios')

async function subscribeToChannel (topic, CALLBACK_URL) {
  const HUB_URL = 'https://pubsubhubbub.appspot.com/subscribe'
  const topicUrl = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${topic}`
  try {
    const response = await axios.post(HUB_URL, null, {
      params: {
        'hub.mode': 'subscribe',
        'hub.topic': topicUrl,
        'hub.callback': CALLBACK_URL,
        'hub.lease_seconds': 864000, // Optional: Set lease duration (10 days in seconds)
        'hub.secret': '' // Optional: Set a secret for HMAC verification
      }
    })
    console.log(`Subscribed to ${topicUrl}`)
    return response
  } catch (error) {
    console.error(`Failed to subscribe to ${topicUrl}:`, error.response ? error.response.data : error.message)
  }
}

module.exports = { subscribeToChannel }
