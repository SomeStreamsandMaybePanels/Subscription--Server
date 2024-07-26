
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb://rob/'



/**
 * @description function to connect the mongoDB to the MongoDB database
 * @return {Promise}
 */
async function query() {
  mongoDB = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useUnifiedTopology: true
    }
  })
  
  const queryObj = { "notifications": true }
  
  // Connect the mongoDB to the server (optional starting in v4.7)

  await mongoDB.connect()
  await mongoDB.db('admin').command({ ping: 1 })
  // ping to confirm successful connection
  console.log('Pinged your deployment. You successfully connected to MongoDB!')
  try {
    const myCollection = await mongoDB.db(process.env.MONGODB_NAME).collection(process.env.MONGODB_SUBSCRIPTION_CONFIG_COLLECTION)
    const query = await myCollection.find(queryObj)
    const allValues = await query.toArray()
    console.log(allValues)
    query.close()
    return allValues
  } catch (error) {
    console.error(error)
  
  }
}



module.exports = { query }
