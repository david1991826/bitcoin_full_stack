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
feeFeePath="${sourcePath}/feeFee"
korgPath="${sourcePath}/korg"
credentialsPath="${sourcePath}/${mode}Credentials"
theomegaPath="${sourcePath}/theomega"

for tigerPath in \
    $calzoneSunPath \
    $commonUtilitiesPath \
    $feeFeePath \
    $korgPath \
    $theomegaPath
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
    $feeFeePath \
    $korgPath \
    $credentialsPath \
    $theomegaPath \
    "${destinationUserName}@${destinationUrl}:${destinationPath}"


echo "👾👾👾👾👾👾👾👾👾👾"
echo "🐯🐅🐯🐅🐯🐅"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "****🐯🐅 The Set Up Tigers Set Up the Necessary Circumstances 🐅🐯****"
