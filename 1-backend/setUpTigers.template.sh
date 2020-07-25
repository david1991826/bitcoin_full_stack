#!/bin/bash

echo "****🐯🐅 The Set Up Tigers 🐅🐯****"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "🐯🐅🐯🐅🐯🐅"
echo "👾👾👾👾👾👾👾👾👾👾"

######################################################
# These values need to be customized for your computer and remote Linux server
######
pemPath="/Users/user-name/user-files/super-secret-path/linux-server-access-file.pem"
destinationUserName="ec2-user"
destinationUrl="ec2-instance-name.ec2-instance-region.compute.amazonaws.com"

sourceRepoPath="/Users/user-name/my-code-folder/bitcoin-api-full-stack"
destinationHomePath="/home/ec2-user"
mode="staging"
# mode="production" # alternate mode

######################################################
######################################################
######################################################

### The code below is taken care of by Bitcoin-Api💕 ###

sourcePath = "${sourceRepoPath}/1-backend"
destinationPath="${destinationHomePath}/tigerScript"

scp \
    -i "${pemPath}" \
    -r \
    "${sourcePath}/calzoneSun" \
    "${sourcePath}/commonUtilities" \
    "${sourcePath}/feeFee" \
    "${sourcePath}/korg" \
    "${sourcePath}/${mode}Credentials" \
    "${sourcePath}/theomega" \
    "${destinationUserName}@${destinationUrl}:${destinationPath}"


echo "👾👾👾👾👾👾👾👾👾👾"
echo "🐯🐅🐯🐅🐯🐅"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "****🐯🐅 The Set Up Tigers Set Up the Necessary Actions 🐅🐯****"
