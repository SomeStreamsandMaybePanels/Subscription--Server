require('dotenv').config()
const axios = require('axios')
const logger = require('./logger')
const HUB_URL = 'https://pubsubhubbub.appspot.com/unsubscriber'
const CALLBACK_URL = process.env.NOTIFICATION_SERVER_URL // Your server's URL for handling subscriptions

/**
 * Function to unsubscribe from a YouTube channel's topic
 * @param {string} youtubeChannelID - The ID of the YouTube channel to unsubscribe from
 */
async function unsubscribeFromChannel(youtubeChannelID) {
  if (!youtubeChannelID) {
    logger.error('YouTube channel ID is required to unsubscribe.')
    return
  }

  const topicURL = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${youtubeChannelID}`

  try {
    const response = await axios.post(HUB_URL, null, {
      params: {
        'hub.mode': 'unsubscribe',
        'hub.topic': topicURL,
        'hub.callback': CALLBACK_URL,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })

    if (response.status === 202) {
      logger.info(`Unsubscribe request sent successfully for channel ID: ${youtubeChannelID}`)
    } else {
      logger.warn(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    logger.error('Failed to send unsubscribe request:', error)
  }
}

// Get the YouTube channel ID from command-line arguments
const youtubeChannelID = process.argv[2]

if (!youtubeChannelID) {
  logger.error('Please provide a YouTube channel ID as an argument.')
  process.exit(1)
}

unsubscribeFromChannel(youtubeChannelID)