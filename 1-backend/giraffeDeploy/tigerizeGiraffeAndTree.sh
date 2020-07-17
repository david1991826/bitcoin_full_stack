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
    npm install @npm.m.stecky.efantis/commonprivate@latest --save
    popd

    pushd ./tree
    npm install @npm.m.stecky.efantis/commonprivate@latest --save
    popd

    pushd ./commonUtilities
    npm install @npm.m.stecky.efantis/commonprivate@latest --save
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
