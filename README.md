

<h3 align="center">subscription-server</h3>

<div align="center">


---

<p align="center"> A subscription server to be used with a discord bot. Uses MongoDB to retrieve configuration settings.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is meant to be a simple youtube subscription server written in JavaScript.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.


### Installing

cd into the directory where you wish to keep the repo and use git clone 

```
git clone https://github.com/SomeStreamsandMaybePanels/Subscription-Server.git
```

cd into the Subscription-Server directory and use npm install to download all required node-modules

```
cd Subscription-Server
npm install
```

End with an example of getting some data out of the system or using it for a little demo.

## 🎈 .env configuration <a name="usage"></a>

make sure to have the following variables setup in your .env file
```
HUB_URL = The URL for your /websub endpoint (push notifications from youtube pubsub will end up here)
PORT = The port that the server will listen through
DATABASE = MongoDB DB name to pull config info from
COLLECTION = MongoDB Collection name to pull config info from


```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@SomeStreamsAndMaybePanels](https://github.com/SomeStreamsandMaybePanels) 

