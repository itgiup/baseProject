#!/bin/bash
# Basic until loop
counter=1
until [ $counter -gt 6 ]
do
    cp .env"$counter" .env
    yarn build
    ((counter++))
done
echo All done
