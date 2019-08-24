# Import required libraries
import os
import json
import time
from firebase import firebase as fb

# Firebase Connection
firebase = fb.FirebaseApplication('https://geo-lean-spot.firebaseio.com/', None)

def dummy_firebase_update():

    # Get the actual time of update
    current_time = str(time.time())
    # Define the update input for the FireBase RT_DB
    crowd_size_update = {current_time:12}
    # Specify Firebase path for update
    fb.post('/Places/Biblioteca_1',crowd_size_update)


# Dummy variable for testing
counter = 0

# Updating loop for Ops
while(counter < 5):
    # Call Firebase Update Function
    dummy_firebase_update()

    # Update Counter Variable
    counter += counter
    # Rest process during 20 units of time
    sleep(20)

