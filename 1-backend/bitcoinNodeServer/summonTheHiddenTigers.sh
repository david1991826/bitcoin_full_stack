#!/bin/bash

echo "****☢️🐑 Summoning/Hiding the Hidden Tigers ****"

read -p "Please choose s,h,e: " she


if [ "$she" = "s" ];
then

    echo "Summoning the Fee Tiger🐆"
    pushd ./feeFee
    npm install
    popd

    echo "Summoning Tiger Omega🐅🐅🐅🐅🐅🐅🐅"
    pushd ./theomega
    npm install
    popd
    
    echo "Summoning the K-Tiger🐯"
    pushd ./korg
    npm install
    popd

    echo "Summoning the Magna-Tiger🦁"
    pushd ./commonUtilities
    npm install
    popd

    echo "Summoning the Calzone-Tiger🍕🦏"
    pushd ./calzoneSun
    npm install
    popd

elif [ "$she" = "e" ];
then

    echo "Elevating the Fee Tiger🐆"
    pushd ./feeFee
    npm install @npm.m.stecky.efantis/commonprivate@latest
    popd

    echo "Elevating Tiger Omega🐅🐅🐅🐅🐅🐅🐅"
    pushd ./theomega
    npm install @npm.m.stecky.efantis/commonprivate@latest
    npm install @npm.m.stecky.efantis/common-exchange@latest
    popd
    
    echo "Elevating the K-Tiger🐯"
    pushd ./korg
    npm install @npm.m.stecky.efantis/commonprivate@latest
    npm install @npm.m.stecky.efantis/common-exchange@latest
    popd

    echo "Elevating the Magna-Tiger🦁"
    pushd ./commonUtilities
    npm install @npm.m.stecky.efantis/commonprivate@latest
    popd

    echo "Elevating the Calzone-Tiger🍕🦏"
    pushd ./calzoneSun
    npm install @npm.m.stecky.efantis/commonprivate@latest
    popd

else

    echo "Hiding the Fee Tiger🐆"
    pushd ./feeFee
    rm -rf ./node_modules
    popd

    echo "Hiding Tiger Omega🐅🐅🐅🐅🐅🐅🐅"
    pushd ./theomega
    rm -rf ./node_modules
    popd
    
    echo "Hiding the K-Tiger🐯"
    pushd ./korg
    rm -rf ./node_modules
    popd

    echo "Hiding the Magna-Tiger🦁"
    pushd ./commonUtilities
    rm -rf ./node_modules
    popd

    echo "Hiding the Calzone-Tiger🍕🦏"
    pushd ./calzoneSun
    rm -rf ./node_modules
    popd

fi
