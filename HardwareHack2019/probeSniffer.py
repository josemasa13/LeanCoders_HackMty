import subprocess
import time
from datetime import datetime
#results = open("results.txt", "a")
subprocess.run(['airmon-ng', 'start', 'wlan0'])
file = open('/home/pi/Desktop/HERE.txt', 'a')
times = [0,0,0]

while 1:

    for x in range(3):
        stdout = subprocess.run(['tshark', '-i', 'wlan0mon', '-f', 'wlan type mgt && subtype probe-req', '-T', 'fields', '-E', 'separator=/s', '-e', 'wlan.sa', '-e', 'wlan.ssid', '-a', 'duration:3'], capture_output=True, text=True).stdout
        splitblah = stdout.split("\n")
        dictofString=dict.fromkeys(splitblah)
        del dictofString[""]
        now = datetime.now()
        timestamp = datetime.timestamp(now)
        
        
        times[x] = len(dictofString)
        time.sleep(1)
    
    #timestamp = datetime.timestamp(now)
    file.write("********\n")
    #print("timestamp: ", timestamp, "\n", "times: ",times, "\n\n")
file.close()
