# Import required libraries
import os
import json
import time
from datetime import datetime
import pyrebase
import subprocess

times = [0,0,0]

# Firebase Configurations with Pyrebase
configuration_sets = {
    'apiKey': "##################",
    'authDomain': "geo-lean-spot.firebaseapp.com",
    'databaseURL': "https://geo-lean-spot.firebaseio.com",
    'projectId': "##################",,
    'storageBucket': "geo-lean-spot.appspot.com",
    'messagingSenderId':"##################",
    'appId': "##################",
}

def monProcess():
    # Enable monitor mode 
    subprocess.run(['airmon-ng', 'start', 'wlan0'])

    for x in range(3):
        stdout = subprocess.run(['tshark', '-i', 'wlan0mon', '-f', 'wlan type mgt && subtype probe-req', '-T', 'fields', '-E', 'separator=/s', '-e', 'wlan.sa', '-a', 'duration:10'], capture_output=True, text=True).stdout
        splitblah = stdout.split("\n")
        dictofString=dict.fromkeys(splitblah)
        del dictofString[""]
        
        times[x] = len(dictofString)
        #time.sleep(1)
    
    print("times: ", times, "\n")
    firebase_update(times)


def firebase_update(times):
    #disable monitor mode
    subprocess.run(['airmon-ng', 'stop', 'wlan0mon'])
    #restart network-manager
    subprocess.run(['systemctl', 'restart', 'network-manager'])
    time.sleep(10)

    firebase = pyrebase.initialize_app(configuration_sets)

    # Initialize Firebase DB
    db = firebase.database()
    #upProcess()
    
    # Get the actual time of update
    current_time = str(time.time()).replace('.','')
    # Define the update input for the FireBase RT_DB
    crowd_size_update = {str(current_time):times}
    # Get the push done
    app_json = json.dumps(crowd_size_update)
    db.child("Places").child("Centro_Estudiantil").push(crowd_size_update)

while(1):
    monProcess()
    #time.sleep(1)
