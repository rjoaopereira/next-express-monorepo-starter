const express = require('express')
const router = express.Router()

let connections = [];
let rand = Math.random();
let intervalId;

const startEvents = () => {
  if(intervalId) {
      return;
  }
  intervalId = setInterval(() => {
    rand = Math.random();
    connections.forEach((res) => {
        res.sseSend({rand});
    });
    console.log("conn: ", connections.length);
    if (!connections.length) {
        clearInterval(intervalId);
        intervalId = undefined;
    }
  }, 3000);
}

router.get('/ping', (req, res, next) => {
  res.json({ ping: 'pong' })
});

router.get('/event-source', (req, res, next) => {
  res.sseSetup();
  res.sseSend({rand});
  connections.push(res);
  res.on('close', function() {
    connections = connections.filter((conn) => {
        return conn !== res;
    });
    res.end();
  });
  startEvents();

})

module.exports = router;
