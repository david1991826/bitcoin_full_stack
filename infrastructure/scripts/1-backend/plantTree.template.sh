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

treePath="${sourceRepoPath}/1-backend/giraffeDeploy/tree"
commonUtilitiesPath="${sourceRepoPath}/1-backend/giraffeDeploy/commonUtilities"
destinationPath="${destinationHomePath}/treeDeploy/giraffeDeploy"

treenvPath="${sourceRepoPath}/1-backend/${mode}Credentials/tree"
treenvDestinationPath="${destinationHomePath}/treeDeploy/stagingCredentials/tree/.env"


for environmentalActivistPath in \
    $treePath \
    $commonUtilitiesPath
do
    pushd $environmentalActivistPath
    rm -rf ./node_modules
    popd
done


echo "⛰The planting has commenced🌋"


scp \
    -i $pemPath \
    -r \
    $treePath \
    $commonUtilitiesPath \
    "${destinationUserName}@${destinationUrl}:${destinationPath}"

scp \
    -i $pemPath \
    $treenvPath \
    "${destinationUserName}@${destinationUrl}:${treenvDestinationPath}"


echo "💦A new tree lives☀️"

echo "👾👾👾👾👾👾👾👾👾👾"
echo "🌲"
echo "🎄🎄🎄🎄"
echo "🌳"
echo "🌷"
echo "🍁"
echo "****⛏🌳 Successfully Planted Tree ****"