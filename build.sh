#!/bin/bash

REGISTRY="localhost:5000"

if [ $# -eq 0 ]
then
	echo Please provide a tag
else
	echo Building ib-search:$1
	docker build -t $REGISTRY/ib-search:$1 .
	docker push $REGISTRY/ib-search:$1
fi

