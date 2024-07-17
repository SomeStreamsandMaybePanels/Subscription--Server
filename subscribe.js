const axios = require('axios')
const { query } = require('./mongodb')
const HUB_URL = 'https://pubsubhubbub.appspot.com/subscribe';
const TOPICS = query()

async function subscribeToChannel(topicUrl, CALLBACK_URL) {
    try {
        const response = await axios.post(HUB_URL, null, {
            params: {
                'hub.mode': 'subscribe',
                'hub.topic': topicUrl,
                'hub.callback': CALLBACK_URL,
                'hub.lease_seconds': 864000, // Optional: Set lease duration (10 days in seconds)
                'hub.secret': '', // Optional: Set a secret for HMAC verification
            },
        });
        console.log(`Subscribed to ${topicUrl}`);
    } catch (error) {
        console.error(`Failed to subscribe to ${topicUrl}:`, error.response ? error.response.data : error.message);
    }
}

module.exports = { subscribeToChannel }
