#!/bin/bash
# If you are developing on OSX on Windows
# but you want to run on linux - or in docker - or on AWS Lambda
# PhantomJS must be the binary for that OS...
# https://github.com/sindresorhus/pageres/issues/275
#
# Easiest solution, download inside a docker, running on linux
#
# This script should be run from within the docker container
#
# Usage
# ---------
# docker run -it -v `pwd`:/app node:latest /app/buildPhantomJSAsLinux-InDocker.sh
#
# when it exits, docker exits.
set -e
echo "building in docker"
cd /app
rm -rf node_modules/phantomjs-prebuilt/
npm install