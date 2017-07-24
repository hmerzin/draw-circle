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
    slots: {
      Size: "Size",
      Color: "AMAZON.Color"
    }
  },
  (req, res) => {
    console.log(req);
    if(req.slot('Color')){
      io.emit('color', {color: req.slot('Color')});
    }
    io.emit("draw", { circle: "circle" });
    //res.directives[0] = {type: 'Dialog.Delegate'};
    //console.log(JSON.stringify(res));
    console.log("DRAW RECIEVED");
    res.response.response.directives.push({
      type: "Dialog.Delegate"
    });
    res.shouldEndSession(false);
    res.send();
    //res.say("check your browser");
  }
);

alexa.intent("PlayVideo", {}, (req, res) => {
  io.emit("video", { video: "video" });
  res.say("playing");
});

expressApp.get("/", (req, res) => {
  res.sendfile("./index.html");
});
