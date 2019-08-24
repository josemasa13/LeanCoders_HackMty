# Hardware Raspberry Pi Configuration

The main purpose of this proyect is to generate a crowd size scanner Wifi based.

## Getting Started

The principal reason for using an extra piece of hardware is to substitude the use of the Cisco CMX, that can be access within the campus. If the access to the Cisco CMX is granted, then this device could be use in remote places of the campus where there is no AP near the area.

### Installing

In order to get running the Raspberry Pi Crowd Scanner, the dependecies needed are: 

* FireBase: To update the Real-time DataBase. In order to make the connection DB with Python we used a wraper to achieved full functionality.
```
$ sudo pip install pyrebase
```
* TShark: To scann the devices near the area.
```
$ sudo apt-get install tshark
```
* Request: To make any kind of http petitions.
```
$ sudo apt-get install request
```

## Built With

* [Python](https://www.python.org/) - The main language.
* [Bash Script](https://maven.apache.org/) - For running the commands in the Raspberry Pi

## Authors

* **Juan Pablo** 
* **Jorge Diego**


## Acknowledgments

* Inspired by [LiveOverflow] (https://liveoverflow.com/)

