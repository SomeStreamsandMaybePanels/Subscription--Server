const http = require('http')
const WebSocket = require('ws')

module.exports = app => {
    // Create the HTTP server and WebSocket server
    const server = http.createServer(app)
    const wss = new WebSocket.Server({ server })

    // WebSocket connection handling
    wss.on('connection', ws => {
        logger.info('Bot connected via WebSocket');

        ws.on('message', message => {
            logger.info(`Received message from client: ${message}`)
        });

        ws.send('Welcome bot!');
    })

    // Start the HTTP server and WebSocket server
    server.listen(port, () => {
        logger.info(`Server is running on port ${port}`)
    })
}