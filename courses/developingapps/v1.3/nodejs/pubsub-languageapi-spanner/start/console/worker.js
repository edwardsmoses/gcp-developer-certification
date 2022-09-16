// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const subscriber = require("../server/gcp/pubsub");
const languageAPI = require("../server/gcp/languageapi");
const spanner = require("../server/gcp/spanner.js");

// TODO: Load the ../server/gcp/spanner module




// END TODO



console.log('Worker starting...');

// The callback function - invoked when a message arrives
function handler(message) {
    console.log('Message received');


    const messageData = JSON.parse(message.toString());
    console.log(messageData);

    languageAPI.analyze(messageData.feedback).then((score) => {
        console.log("Sentiment Score:", score);
        messageData.score = score;
        return messageData;
    }).then((feedback) => {
        spanner.saveFeedback(feedback).then(() => {
            console.log("Feedback saved!!");
        }).catch((error) => {
            console.error(error);
        })
    })



    // END TODO

    // TODO: Pass on the feedback object
    // to next Promise handler



    // END TODO

    // TODO: Add third .then(...)

    // TODO Log feedback saved message

    // END TODO


    // END TODO

    // TODO close off the promise chain with a catch() and log
    // any errors to the console

    // END TODO

}

//register the handler as a pubsub subcription to subscribe to the Feedback topic.. 
subscriber.registerFeedbackNotification(handler);
