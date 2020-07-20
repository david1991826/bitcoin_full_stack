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
    -i <path-to-pem> \
    -r \
    ./commonUtilities \
    ./tree \
    ./freshenSoil.sh \
    ./syrupTree.sh \
    ./waterTree.sh \
   <url>:<path>


scp \
    -i /folder/file.pem \
    ./treenv \
   <url>:<path-to-treenv>

echo "💦A new tree lives☀️"

echo "👾👾👾👾👾👾👾👾👾👾"
echo "🌲"
echo "🎄🎄🎄🎄"
echo "🌳"
echo "🌷"
echo "🍁"
echo "****⛏🌳 Successfully Planted Tree ****"