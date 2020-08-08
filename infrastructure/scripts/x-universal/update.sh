#!/bin/sh


pushd ../../../0-commonCode/general

npm install orgasm@latest --save

popd


pushd ../../../0-commonCode/private

npm install @bitcoin-api.io/common-general@latest --save
npm install @bitcoin-api.io/redis-streams-utils@latest --save
npm install do-redis-request@latest --save
npm install drf@latest --save
npm install drq@latest --save
npm install get-redis-client@latest --save
npm install orgasm@latest --save

popd


pushd ../../../0-commonCode/exchange

npm install @bitcoin-api.io/common-private@latest --save
npm install orgasm@latest --save

popd

