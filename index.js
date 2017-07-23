const express = require("express");
const Alexa = require("alexa-app");

const expressApp = express();

const alexa = Alexa.app("draw");

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


expressApp.use((req, res) => {
  console.log(req.body);
  res.write('ddddd');
})
