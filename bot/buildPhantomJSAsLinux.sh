#!/bin/bash
# If you are developing on OSX on Windows
# but you want to run on linux - or in docker - or on AWS Lambda
# PhantomJS must be the binary for that OS...
# https://github.com/sindresorhus/pageres/issues/275
#
# Easiest solution, download inside a docker, running on linux
#
# 1. install docker
# 2. Run this script, located as a sibling of your package.json file
set -e
docker run -it \
    -v `pwd`:/app \
    node:latest \
   /app/buildPhantomJSAsLinux-InDocker.sh