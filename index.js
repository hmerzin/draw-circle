const express = require("express");
const Alexa = require("alexa-app");
const socketio = require('socket.io');
const https = require('https');

const expressApp = express();

const alexa = new Alexa.app("draw");

alexa.express({ expressApp: expressApp });

alexa.intent(
  "DrawIntent",
  {
    dialog: {
      type: "delegate"
    },

    slots: {
      size: "Size",
      color: "AMAZON.Color"
    }
  },
  (req, res) => {
    res.say("check your browser");
  }
);

const server = socketio(https.createServer(expressApp).listen(process.env.PORT || 8080));
