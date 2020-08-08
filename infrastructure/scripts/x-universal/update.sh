#!/bin/sh


pushd ../../../0-commonCode/general

npm install orgasm@latest --save
npm install

popd


pushd ../../../0-commonCode/private

npm install @bitcoin-api.io/common-general@latest --save
npm install @bitcoin-api.io/redis-streams-utils@latest --save
npm install do-redis-request@latest --save
npm install drf@latest --save
npm install drq@latest --save
npm install get-redis-client@latest --save
npm install orgasm@latest --save
npm install

popd


pushd ../../../0-commonCode/exchange

npm install @bitcoin-api.io/common-private@latest --save
npm install orgasm@latest --save
npm install

popd


pushd ../../../1-backend/commonUtilities

npm install @bitcoin-api.io/common-private@latest --save
npm install bqe@latest --save
npm install

popd


pushd ../../../1-backend/calzoneSun

npm install @bitcoin-api.io/common-private@latest --save
npm install orgasm@latest --save
npm install

popd


pushd ../../../1-backend/feeFee

npm install @bitcoin-api.io/common-private@latest --save
npm install

popd


pushd ../../../1-backend/giraffeDeploy/commonUtilities

npm install @bitcoin-api.io/common-private@latest --save
npm install

popd


pushd ../../../1-backend/giraffeDeploy/giraffe

npm install @bitcoin-api.io/common-private@latest --save
npm install

popd


pushd ../../../1-backend/giraffeDeploy/tree

npm install @bitcoin-api.io/common-private@latest --save
npm install

popd


pushd ../../../1-backend/korg

npm install @bitcoin-api.io/common-private@latest --save
npm install @bitcoin-api.io/common-exchange@latest --save
npm install

popd


pushd ../../../1-backend/theomega

npm install @bitcoin-api.io/common-private@latest --save
npm install @bitcoin-api.io/common-exchange@latest --save
npm install orgasm@latest --save
npm install

popd


pushd ../../../2-api

npm install @bitcoin-api.io/common-bridge@latest --save
npm install @bitcoin-api.io/common-general@latest --save
npm install @bitcoin-api.io/common-private@latest --save
npm install @bitcoin-api.io/common-exchange@latest --save
npm install orgasm@latest --save
npm install
npm fund

popd
