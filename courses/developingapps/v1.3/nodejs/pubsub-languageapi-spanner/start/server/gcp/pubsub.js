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
const config = require('../config');
const {PubSub} = require('@google-cloud/pubsub');


//create a client object for Cloud PubSUb
const pubSub = new PubSub({
    projectId: config.get('GCLOUD_PROJECT')
});

//get a reference to the topic 'feedback'
const feedbackTopic = pubSub.topic('feedback');


function publishFeedback(feedback) {
  
    const dataBuffer  = Buffer.from(JSON.stringify(feedback));
    return feedbackTopic.publish(dataBuffer);
}

// The worker application will pass a callback to this 
// method as the cb argument so it is notified when a
// feedback PubSub message is received
function registerFeedbackNotification(cb) {
  // TODO: Create a subscription called worker-subscription
  // TODO: Have it auto-acknowledge messages 


    // TODO: Trap errors where the subscription already exists 
    // Create a subscription object for worker-subscription if
    // the subscrioption already exists
    // err.code == 6 means subscription already exists 

    // END TODO

    // TODO: Use the get() method on the subscription object to call 
    // the API request to return a promise


      // The results argument in the promise is an array - the 
      // first element in this array is the subscription object.

      // TODO: Declare a subscription constant


      // END TODO

      // TODO: Register an event handler for message events
      // Use an arrow function to handle the event
      // When a message arrives, invoke a callback


      // END TODO


      // TODO: Register an event handler for error events
      // Print the error to the console


      // END TODO


    // END TODO for the get() method promise 

    // TODO
    // Add a final catch to the promise to handle errors


    // END TODO


  // END TODO for the create subscription method

}

// [START exports]
module.exports = {
  publishFeedback,
  registerFeedbackNotification
};
// [END exports]
