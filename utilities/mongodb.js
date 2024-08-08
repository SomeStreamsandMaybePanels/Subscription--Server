require('dotenv').config()

module.exports = async (mongoClient, mongoDatabaseName, mongoDatabaseSubscriptionCollectionName) => {
  const queryObj = { "notifications": true }

  // Connect the mongoDB to the server (optional starting in v4.7)

  await mongoClient.connect()
  await mongoClient.db('admin').command({ ping: 1 })
  // ping to confirm successful connection
  console.log('Pinged your deployment. You successfully connected to MongoDB!')
  try {
    const myCollection = await mongoClient.db(mongoDatabaseName).collection(mongoDatabaseSubscriptionCollectionName)
    const query = await myCollection.find(queryObj)
    const allValues = await query.toArray()
    console.log(allValues)
    query.close()
    return allValues
  } catch (error) {
    console.error(error)

  }
}

// todo revise this so that it will be dependent on an injected instance of MongoDBClient
