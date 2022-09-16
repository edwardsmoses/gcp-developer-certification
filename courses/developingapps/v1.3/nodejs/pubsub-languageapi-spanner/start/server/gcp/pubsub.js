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
const { PubSub } = require('@google-cloud/pubsub');


//create a client object for Cloud PubSUb
const pubSub = new PubSub({
    projectId: config.get('GCLOUD_PROJECT')
});

//get a reference to the topic 'feedback'
const feedbackTopic = pubSub.topic('feedback');


function publishFeedback(feedback) {
    const dataBuffer = Buffer.from(JSON.stringify(feedback));
    return feedbackTopic.publish(dataBuffer);
}

// The worker application will pass a callback to this 
// method as the cb argument so it is notified when a
// feedback PubSub message is received
function registerFeedbackNotification(cb) {

    feedbackTopic.createSubscription('worker-subscription', {
        autoAck: true,
    }, (err, feedbackSubscription) => {

        if (err && err.code == 6) {
            console.log('Feedback subscription already exists');
            feedbackSubscription = feedbackTopic.subscription("worker-subscription")
        }

        feedbackSubscription.get().then(([subscription]) => {
            
            subscription.on('message', message => {
                cb(message.data);
            });

            subscription.on('error', err => {
                console.error(err);
            });
        }).catch((error) => {
            console.log("Error getting feedback subscription", error);
        })
    });
}

// [START exports]
module.exports = {
    publishFeedback,
    registerFeedbackNotification
};
// [END exports]
