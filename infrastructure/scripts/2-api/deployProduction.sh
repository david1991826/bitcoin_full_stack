#!/bin/sh

pushd ../../../2-api/

npm install

echo \"swaggy swag v3🐺🐺🐺\"

node ./deployFunctions --mode=production $0 $1 $2 $3 $4 $5 $6 $7 $8 $9

popd
