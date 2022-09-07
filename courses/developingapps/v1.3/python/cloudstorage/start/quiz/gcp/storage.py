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
project_id = os.getenv('GCLOUD_PROJECT')

# Get the Bucket name from the GCLOUD_BUCKET environment variable
bucket_name = os.getenv('GCLOUD_BUCKET')

# Import the storage module
from google.cloud import storage

# Create a client for Cloud Storage
storage_client = storage.Client()

# Use the client to get the Cloud Storage bucket
bucket = storage_client.get_bucket(bucket_name)


"""
Uploads a file to a given Cloud Storage bucket and returns the public url
to the new object.
"""
def upload_file(image_file, public):

    pass
    # Use the bucket to get a blob object
    blob = bucket.blob(image_file.filename)
    
    # Use the blob to upload the file
    blob.upload_from_string(
        image_file.read(),
        content_type=image_file.content_type)
    
    # Make the object public
    if public:
        blob.make_public()

    # Modify to return the blob's Public URL
    return blob.public_url