#!/bin/bash

echo "****Freshening the soil🏞 ****"

pushd ./tree
rm -rf node_modules
npm install
popd

pushd ./commonUtilities
rm -rf node_modules
npm install
popd

echo "****The soil has been freshened💧☀️⛏****"
