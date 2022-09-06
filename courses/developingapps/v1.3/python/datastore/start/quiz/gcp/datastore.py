# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os

# Get the project id from the env variable
project_id = os.getenv('GCLOUD_PROJECT')

from flask import current_app
from google.cloud import datastore

# Create the Datastore client object using the project_id
datastore_client = datastore.Client(project_id)


"""
Returns a list of question entities for a given quiz
- filter by quiz name, defaulting to gcp
- no paging
- add in the entity key as the id property 
- if redact is true, remove the correctAnswer property from each entity
"""
def list_entities(quiz='gcp', redact=True):
    return [{'quiz':'gcp', 'title':'Sample question', 'answer1': 'A', 'answer2': 'B', 'answer3': 'C', 'answer4': 'D', 'correctAnswer': 1, 'author': 'Nigel'}]


def save_question(question):

    # Creating the key for an entity in the Question Kind
    key = datastore_client.key('Question')
    
    # Creating the entity
    q_entity = datastore.Entity(key=key)

    # Iterate over the form values supplied to the function
    for q_prop, q_val in question.items():
        q_entity[q_prop] = q_val

    # Save
    datastore_client.put(q_entity)


