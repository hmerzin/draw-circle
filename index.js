const express = require("express");
const Alexa = require("alexa-app");

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

expressApp.listen(process.env.PORT || 8080);
