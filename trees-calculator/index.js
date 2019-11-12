'use strict';
const Alexa = require('ask-sdk-core');
var treeConsumptionCalculator = require('./treeConsumptionCalculator.js');
// use 'ask-sdk' if standard SDK module is installed

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderFlowers';
    },
    handle(handlerInput) {
      let destA = handlerInput.requestEnvelope.request.intent.slots.destA.value
      let destB = handlerInput.requestEnvelope.request.intent.slots.destB.value
      let carReg = handlerInput.requestEnvelope.request.intent.slots.carReg.value

      console.log("Handler input!!! ", destA, destB, carReg)
      // const speechText = 'Hello Kamar!';
      // return handlerInput.responseBuilder
      //             .speak(speechText)
      //             .withSimpleCard('Hello World', speechText)
      //             .getResponse();
      // const speechText = 'Hello Kamar!';
      // return handlerInput.responseBuilder
      //             .speak(speechText)
      //             .withSimpleCard('Hello World', speechText)
      //             .getResponse();

      let returnedData = treeConsumptionCalculator.handler(destA, destB, carReg, function (err, data) {
        console.log("GETTING THE STUFF", data)
        return data.toString()
      })

      return handlerInput.responseBuilder
                  .speak(returnedData)
                  .withSimpleCard('Hello World', returnedData)
                  .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';
return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelloWorldIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler)
     .lambda();
