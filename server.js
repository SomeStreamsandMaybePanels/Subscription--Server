const http = require('http');
const url = require('url');

// Maintain a list of subscribed channel IDs
const subscribedChannels = new Set();


const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (pathname === '/subscribe') {
        // Handle subscription requests
        const channelID = req.headers['x-channel-id'];
        subscribedChannels.add(channelID);
        // Subscribe to the YouTube topic URL for this channel
        // (You'll need to implement this logic)

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Subscribed successfully!\n');
    } else if (pathname === '/unsubscribe') {
        // Handle unsubscription requests
        const channelID = req.headers['x-channel-id'];
        subscribedChannels.delete(channelID);
        // Unsubscribe from the YouTube topic URL for this channel
        // (You'll need to implement this logic)

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Unsubscribed successfully!\n');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found\n');
    }
})



const PORT = 3300;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
