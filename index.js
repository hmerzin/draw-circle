const express = require("express");
const Alexa = require("alexa-app");
const socketio = require("socket.io");
const http = require("http");

const expressApp = express();

const io = socketio(
  http.createServer(expressApp).listen(process.env.PORT || 8080)
);


const alexa = new Alexa.app("draw");

alexa.express({ expressApp: expressApp });

alexa.intent(
  "DrawIntent",
  {
    dialog: {
      type: "delegate"
    },

    slots: {
      Size: "Size",
      Color: "AMAZON.Color"
    }
  },
  (req, res) => {
    io.emit("draw", { circle: "circle" });
    res.say('check your browser');
    //res.say("check your browser");
  }
);

alexa.intent('PlayVideo', {}, (req, res) => {
  io.emit('video', {video: 'video'});
  //res.say('playing');
})

expressApp.get("/", (req, res) => {
  res.sendfile('./index.html');
});
