#!/usr/bin/env bash

# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
echo "Creating the gke cluster..."
gcloud beta container clusters create ${C2_NAME} \
    --zone ${C2_ZONE} \
    --no-enable-basic-auth \
    --enable-autoupgrade \
    --max-surge-upgrade 1 \
    --max-unavailable-upgrade 0 \
    --enable-autorepair \
    --image-type "COS" \
    --release-channel "regular" \
    --machine-type=n1-standard-4 \
    --num-nodes=${C2_NODES} \
    --workload-pool=${WORKLOAD_POOL} \
    --enable-stackdriver-kubernetes \
    --metadata disable-legacy-endpoints=true \
    --labels mesh_id=${MESH_ID} \
    --addons HorizontalPodAutoscaling,HttpLoadBalancing \
    --default-max-pods-per-node "110" \
    --enable-ip-alias \
    --no-enable-master-authorized-networks \
    --subnetwork=default \
    --scopes ${C2_SCOPE}

echo "Registering the gke cluster..."
gcloud container hub memberships register ${C2_NAME} \
   --gke-cluster=${C2_ZONE}/${C2_NAME}  \
   --enable-workload-identity