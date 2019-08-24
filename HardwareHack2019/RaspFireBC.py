# Import required libraries
import os
import json
import time
import pyrebase

# Firebase Configurations with Pyrebase
configuration_sets = {
    'apiKey': "AIzaSyCGZwf8Trjn70HhlqTWcvKy8vcxD9ZSrms",
    'authDomain': "geo-lean-spot.firebaseapp.com",
    'databaseURL': "https://geo-lean-spot.firebaseio.com",
    'projectId': "geo-lean-spot",
    'storageBucket': "geo-lean-spot.appspot.com",
    'messagingSenderId':"376675735017",
    'appId': "1:376675735017:web:5a312db977430ace"
}
firebase = pyrebase.initialize_app(configuration_sets)

# Initialize Firebase DB
db = firebase.database()

def dummy_firebase_update():

    # Get the actual time of update
    current_time = str(time.time()).replace('.','')
    # Define the update input for the FireBase RT_DB
    crowd_size_update = {str(current_time):12}
    # Get the push done
    app_json = json.dumps(crowd_size_update)
    db.child("Places").child("Biblioteca_1").push(crowd_size_update)


# Dummy variable for testing
counter = 0

# Updating loop for Ops
while(counter < 5):
    # Call Firebase Update Function
    dummy_firebase_update()
    # Update Counter Variable
    counter += 1
    # Rest process during 20 units of time
    time.sleep(10)

