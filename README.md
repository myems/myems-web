# MyEMS Web

## Introduction
MyEMS Web 界面，用于能源数据分析
Providing Web UI for MyEMS users to analysis energy data


## Prerequisites
nginx-1.18.0 or later

myems-database

myems-api



## Installation

* Install NGINX  Server

refer to http://nginx.org/en/docs/install.html

* Install myems-web :

  Check and change the config file if necessary:
```
  $ cd ~/myems-web
  $ sudo nano src/config.js
```
  Build and install
```
  $ sudo npm run build
  $ cd build
  $ sudo rm -r /usr/share/nginx/html/
  $ sudo cp -r .  /usr/share/nginx/html/
  $ sudo chmod 0755 -R /usr/share/nginx/html/
```
