#!/bin/bash

echo "***🦒🌲->🐅 Tigerizing Giraffe and Tree ****"

read -p "Please choose s,h,e: " she

if [ "$she" = "h" ];
then

    pushd ./giraffe
    rm -rf node_modules
    popd

    pushd ./tree
    rm -rf node_modules
    popd

    pushd ./commonUtilities
    rm -rf node_modules
    popd

elif [ "$she" = "e" ];
then

    pushd ./giraffe
    npm install @bitcoin-api.io/common-private@latest --save
    popd

    pushd ./tree
    npm install @bitcoin-api.io/common-private@latest --save
    popd

    pushd ./commonUtilities
    npm install @bitcoin-api.io/common-private@latest --save
    popd

else

    pushd ./giraffe
    rm -rf node_modules
    npm install
    popd

    pushd ./tree
    rm -rf node_modules
    npm install
    popd

    pushd ./commonUtilities
    rm -rf node_modules
    npm install
    popd

fi
