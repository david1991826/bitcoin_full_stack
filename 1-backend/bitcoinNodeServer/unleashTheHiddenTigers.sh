#!/bin/bash

echo "****☢️🐑 Unleashing the Hidden Tigers ****"
echo "🐆"
echo "🐅🐅🐅🐅🐅🐅🐅"
echo "🐯"
echo "🦁"
echo "*****************************************"

## TODO: 
#     trigger json listner
#     script changes json
#     when they can, will switch off and change json (with lock)
#     done when listener detects all are off

pm2 kill

node ./theomega/scripts/cleanTheLocalDinoCache.js

echo "h" | ./summonTheHiddenTigers.sh
echo "s" | ./summonTheHiddenTigers.sh

pm2 start

pushd ./feeFee
pm2 start ./UpdateFeeDataWorker.js
popd

pushd ./theomega
pm2 start ./UpdateDepositData.js
popd

pushd ./korg
pm2 start ./WithdrawMoneyDoer.js
popd


echo "*************************************************"
echo "🐆"
echo "🐅🐅🐅🐅🐅🐅🐅"
echo "🐯"
echo "🦁"
echo "****☢️🐑The Hidden Tigers Have Been Unleashed ****"
