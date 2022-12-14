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
const { Spanner } = require('@google-cloud/spanner');

//create the CloudSpanner client.. 
const spanner = new Spanner({
    projectID: config.get('GCLOUD_PROJECT'),
});

const instance = spanner.instance("quiz-instance");
const database = instance.database("quiz-database");
const feedbackTable = database.table("feedback");


async function saveFeedback({ email, quiz, timestamp, rating, feedback, score }) {

    //reverse the user's email.. 
    const rev_email = email
        .replace(/[@\.]/g, '_')
        .split('_')
        .reverse()
        .join('_');

    const record = {
        feedbackId: `${rev_email}_${quiz}_${timestamp}`,
        email,
        quiz,
        timestamp,
        rating,
        score: Spanner.float(score),
        feedback,
    };

    try {
        console.log('Saving the feedback to the feedbackTable in the spanner database instance');
        await feedbackTable.insert(record);
    } catch (err) {

        //Spanner returns error code '6' when record with the same id exists
        if (err.code === 6) {
            console.log("Duplicate message - feedback already saved.");
        } else {
            console.error("ERROR processing feedback:", err);
        }
    }
}

module.exports = {
    saveFeedback
};