#!/bin/sh


####
####  Common Code
####

pushd ../../../0-commonCode/api

npm install @bitcoin-api/redis-streams-utils@latest --save
npm install do-redis-request@latest --save
npm install drf@latest --save
npm install drq@latest --save
npm install get-redis-client@latest --save
npm install

popd


pushd ../../../0-commonCode/exchange

npm install @bitcoin-api/full-stack-api@latest --save
npm install

popd


####
####  Backend
####


pushd ../../../1-backend/commonUtilities

npm install @bitcoin-api/full-stack-api@latest --save
npm install bqe@latest --save
npm install bitcoin-request@latest --save
npm install

popd


pushd ../../../1-backend/addressGenerator

npm install @bitcoin-api/full-stack-api@latest --save
npm install @bitcoin-api/full-stack-backend@latest --save
npm install

popd


pushd ../../../1-backend/feeDataBot

npm install @bitcoin-api/full-stack-api@latest --save
npm install @bitcoin-api/full-stack-backend@latest --save
npm install

popd


pushd ../../../1-backend/withdrawsBot

npm install @bitcoin-api/full-stack-api@latest --save
npm install @bitcoin-api/full-stack-exchange@latest --save
npm install @bitcoin-api/full-stack-backend@latest --save
npm install

popd


pushd ../../../1-backend/depositsBot

npm install @bitcoin-api/full-stack-api@latest --save
npm install @bitcoin-api/full-stack-exchange@latest --save
npm install @bitcoin-api/full-stack-backend@latest --save
npm install

popd


####
####  Backend Giraffe Lick Leaf
####


pushd ../../../1-backend/giraffeDeploy/commonUtilities

npm install @bitcoin-api/full-stack-api@latest --save
npm install

popd


pushd ../../../1-backend/giraffeDeploy/giraffe

npm install @bitcoin-api/full-stack-api@latest --save
npm install

popd


pushd ../../../1-backend/giraffeDeploy/tree

npm install @bitcoin-api/full-stack-api@latest --save
npm install

popd


####
####  API
####

pushd ../../../2-api/sacredElementals/crypto/exchangeBitcoinApi

npm install bitcoin-api@latest --save
npm install

popd


# pushd ../../../2-api

# npm install @bitcoin-api.io/common-bridge@latest --save
# npm install @bitcoin-api.io/common-general@latest --save
# npm install @bitcoin-api.io/common-private@latest --save
# npm install @bitcoin-api.io/common-exchange@latest --save
# npm install
# npm fund

# popd