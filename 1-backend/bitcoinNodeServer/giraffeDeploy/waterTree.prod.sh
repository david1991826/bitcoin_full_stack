#!/bin/bash

echo "****💧🌴 Watering the Tree SH ****"

./freshenSoil.sh

pushd ./tree
pm2 start ./WaterTree.js -- --mode=production
popd

echo "****💧🌴The tree has been watered ****"
