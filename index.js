const express = require("express");
const Alexa = require("./alexa-app");
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
    console.log(req.slot("Color"));
    console.log('completed: ' + req.getDialog().isCompleted())
    io.emit("draw", { circle: "circle" });
    //res.directives[0] = {type: 'Dialog.Delegate'};
    //console.log(JSON.stringify(res));
    res.shouldEndSession(true);
    if (req.slot("Color")) {
      io.emit("color", { color: req.slot("Color") });
    }

    if (req.slot("Size")) {
      io.emit("size", { size: req.slot("Size") });
    }

    console.log("completed: " + req.getDialog().isCompleted());
    if (!req.getDialog().isCompleted()) {
      res.directive({
        type: "Dialog.Delegate"
      });
      res.shouldEndSession(false);
    } else {
      res.say("check your browser");
    }
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
