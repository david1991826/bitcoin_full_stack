#!/bin/bash

echo "****🐯🐅 The Set Up Tigers 🐅🐯****"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "🐯🐅🐯🐅🐯🐅"
echo "👾👾👾👾👾👾👾👾👾👾"

######################################################
######################################################
# These values need to be customized for your computer and remote Linux server
######
mode="staging" # OR "production"

pemPath="/Users/user-name/user-files/super-secret-path/linux-server-access-file.pem"
sourceRepoPath="/Users/user-name/my-code-folder/bitcoin-api-full-stack"

destinationUserName="ec2-user"
destinationUrl="ec2-instance-name.ec2-instance-region.compute.amazonaws.com"
destinationHomePath="/home/ec2-user"
######################################################
######################################################

### The code below is taken care of by Bitcoin-Api😁✌🕊💕🏛 ###

sourcePath="${sourceRepoPath}/1-backend"
destinationPath="${destinationHomePath}/tigerScript"

calzoneSunPath="${sourcePath}/calzoneSun"
commonUtilitiesPath="${sourcePath}/commonUtilities"
feeDataBotPath="${sourcePath}/feeDataBot"
withdrawsBotPath="${sourcePath}/withdrawsBot"
credentialsPath="${sourcePath}/${mode}Credentials"
depositsBotPath="${sourcePath}/depositsBot"

for tigerPath in \
    $calzoneSunPath \
    $commonUtilitiesPath \
    $feeDataBotPath \
    $withdrawsBotPath \
    $depositsBotPath
do
    pushd $tigerPath
    rm -rf ./node_modules
    popd
done

scp \
    -i $pemPath \
    -r \
    $calzoneSunPath \
    $commonUtilitiesPath \
    $feeDataBotPath \
    $withdrawsBotPath \
    $credentialsPath \
    $depositsBotPath \
    "${destinationUserName}@${destinationUrl}:${destinationPath}"


echo "👾👾👾👾👾👾👾👾👾👾"
echo "🐯🐅🐯🐅🐯🐅"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "****🐯🐅 The Set Up Tigers Set Up the Necessary Circumstances 🐅🐯****"
