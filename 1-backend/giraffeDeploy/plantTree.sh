#!/bin/bash

echo "****⛏🌳 Planting the Tree ****"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "🌲"
echo "🎄🎄🎄🎄"
echo "🌳"
echo "🌷"
echo "🍁" 
echo "👾👾👾👾👾👾👾👾👾👾"

echo "⛳️Digging the hole for the tree"

pushd ./commonUtilities
rm -rf ./node_modules
popd
pushd ./tree
rm -rf ./node_modules
popd

echo "⛰The planting has commenced🌋"

scp \
    -i /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/zdist/staging.pem \
    -r \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/giraffeDeploy/commonUtilities \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/giraffeDeploy/tree \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/giraffeDeploy/freshenSoil.sh \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/giraffeDeploy/syrupTree.sh \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/giraffeDeploy/waterTree.sh \
    ec2-user@ec2-3-234-146-93.compute-1.amazonaws.com:/home/ec2-user/treeDeploy/giraffeDeploy


scp \
    -i /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/zdist/staging.pem \
    /Users/michaelstecky-efantis/Documents/GitHub/zarbon_complex/stagingCredentials/tree/.env \
    ec2-user@ec2-3-234-146-93.compute-1.amazonaws.com:/home/ec2-user/treeDeploy/stagingCredentials/tree

echo "💦A new tree lives☀️"

echo "👾👾👾👾👾👾👾👾👾👾"
echo "🌲"
echo "🎄🎄🎄🎄"
echo "🌳"
echo "🌷"
echo "🍁"
echo "****⛏🌳 Successfully Planted Tree ****"