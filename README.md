# MyEMS Web

## Introduction
MyEMS Web 界面，用于能源数据分析
Providing Web UI for MyEMS users to analysis energy data

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d65a896c59f34eadb5c90c8e1abc22ce)](https://app.codacy.com/gh/myems/myems-web?utm_source=github.com&utm_medium=referral&utm_content=myems/myems-web&utm_campaign=Badge_Grade)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/myems/myems-web/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/myems/myems-web/?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/390e65ff77c25d1a5a05/maintainability)](https://codeclimate.com/github/myems/myems-web/maintainability)

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
