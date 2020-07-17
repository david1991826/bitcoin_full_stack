#!/bin/bash

echo "****🌴 Syruping the Tree SH ****"

pushd ./tree
pm2 delete ./WaterTree.js
popd

echo "****💧🌴The tree has been syruped ****"
