#!/bin/sh

pushd ../../../2-api/v3

# TODO: move remove v3 folder


npm install


echo \"swaggy swag v3🐺🐺🐺\"


node ./deployFunctions $0 $1 $2 $3 $4 $5 $6 $7 $8 $9


popd
