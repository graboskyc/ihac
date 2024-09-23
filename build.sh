#!/bin/bash

echo
echo "+================================"
echo "| START: IHAC"
echo "+================================"
echo

datehash=`date | md5sum | cut -d" " -f1`
abbrvhash=${datehash: -8}

echo 
echo "Building container using tag ${abbrvhash}"
echo
docker build -t graboskyc/ihac:latest -t graboskyc/ihac:${abbrvhash} .
EXITCODE=$?

if [ $EXITCODE -eq 0 ]
    then

    echo 
    echo "Starting container"
    echo
    docker stop ihac
    docker rm ihac
    docker run -t -i -d -p 8000:8000 --name ihac --restart unless-stopped graboskyc/ihac:${abbrvhash}

    echo
    echo "+================================"
    echo "| END:  IHAC"
    echo "+================================"
    echo
else
    echo
    echo "+================================"
    echo "| ERROR: Build failed"
    echo "+================================"
    echo
fi