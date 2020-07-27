# bitcoin-api-full-stack

<img
    src="https://bitcoin-api.s3.amazonaws.com/images/visual_art/azubuike-bitcoin-api-full-stack-2.png"
    width="290"
/>

#### Complete Code Base for Bitcoin-Api

<br>

## Video Demo of Exchange and Casino Technology

<a href="https://youtu.be/EMAwIrHM2Qc">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png"
        width="85"
    />
</a>



## API, Exchange, and Casino Features

* Can configure the lowest possible fees (blockchain fee only on withdraw)
* Quick to set up
* Extremely scalable
* Highly economical operational fees 
* Very robust security


## Contents
* [About](#about)
* [Bitcoin Node Servers](#bitcoin-node-servers)
* [How to Set Up the Backend](#how-to-set-up-the-backend)
* [How to Deploy Backend](#how-to-deploy-backend)
* [How to Deploy API](#how-to-deploy-api)
* [How to Deploy Frontend](#how-to-deploy-frontend)


### About

The repo `bitcoin-api-full-stack` is a repo for anybody, even an individual,
to have their own Bitcoin management technology. Instead of needing an
entire group of individuals or a company to manage a Bitcoin wallet app,
exchange or casino, this repo aims to give the user complete individual control over
these powerful financial technologies.

Github Stars⭐️⭐️⭐️⭐️⭐️ are always super-greatly appreciated, thank you very much!😁✌️


### Bitcoin Node Servers

![https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture-2.png](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture-2.png)

Briefly put: The NodeJS services interact with the Bitcoin node which in turn interacts with the Bitcoin blockchain. Overall, this means the NodeJS services gather data from the Bitcoin blockchain. The NodeJS services then perform the required actions on the Bitcoin-Api database. For example the fee data worker gets an estimate for the fee from the Bitcoin blockchain and updates the Bitcoin-Api database with that fee. That fee estimate can then be retrieved publicly using the `https://bitcoin-api.io/v3/fee-data` endpoint.

### How to Set Up the Backend


#### Requirements:

1. Have a Mac or Linux server, this can be a computer in your home, or in the cloud (e.g. an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)). The Linux server must meet [Bitcoin Core's computer requirements](https://bitcoin.org/en/bitcoin-core/features/requirements).

2. Have access to that server. This means you should be able to access a command-line or terminal in that server using [ssh](https://en.wikipedia.org/wiki/Secure_Shell). You can also manually install the backend on a computer locally without ssh, that computer just needs to stay running and connected to the internet for the services to remain active.

3. Have a Redis service that you can access using a URL. [Redis Labs](https://redislabs.com) provides great Redis services.


### Set Up The Bitcoin Node Server(s)

The backend node server is responsible for updating the database. The backend node server has three main functions:

1. Update the fee data

2. Update the bitcoin deposit data, this includes user balance data

3. Perform bitcoin withdraws


> About multiple servers:
You can set up multiple backend servers if you have lots and lots of addresses although you only need one backend server, even if you have a few hundred thousand addresses. (This hasn't been tested yet although this is according to what [Andreas Antonopoulos](https://aantonop.com/) said. It should be taken into consideration that this claim was made in 2019 and that the tech is always improving.)


#### Steps to Setup a Bitcoin-Api Bitcoin Node Server

This section assumes you have the requirements listed above.


#### 1) Install and Start Bitcoin node

**About**

Install and start [Bitcoin Core](https://bitcoin.org/en/bitcoin-core) on the server. This can take a while because the livenet blockchain takes a decent amount of time to transfer to your server through the internet because of its size which is currently over 250GB. The testnet blockchain downloads much faster because it's currently only around 25GB.


**Steps**

**a)** First, in the CLI of your Linux server, download the most recent Bitcoin Core code with the following command:
```
wget https://bitcoin.org/bin/bitcoin-core-0.20.0/bitcoin-0.20.0-x86_64-linux-gnu.tar.gz
```
(you can check the [Official Bitcoin Core Download Page](https://bitcoin.org/en/download) to make sure this is the most recent Linux download link)

**b)** Extract the computer-usable code from the downloaded Bitcoin Core code:

```
tar xzf bitcoin-0.20.0-x86_64-linux-gnu.tar.gz
```

**c)** Run this command to set up the Bitcoin Core Bitcoin node code on your Linux server:

```
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-0.20.0/bin/*
```

**d)** Start your Bitcoin node:

Start your bitcoin in staging mode (testnet):
```
bitcoind -testnet -daemon
```

OR

Start your bitcoin in production mode (livenet):
```
bitcoind -daemon
```

This should start up your Bitcoin node and trigger the blockchain to begin downloading onto your Linux server.

You can check to see that your Bitcoin node is running and how many blocks have currently been downloaded using the following command:

in staging
```
bitcoin-cli -testnet getblockcount
``` 
OR

in production
```
bitcoin-cli getblockcount
```

The resulting number of this bitcoin-cli command can be compared with the total number of blocks in the Bitcoin blockchain, also called the *block height*:

* [Blockchain.com Webpage with the Testnet Total Block Height](https://www.blockchain.com/btc-testnet/blocks)

* [Blockchain.com Webpage with the Livenet Total Block Height](https://www.blockchain.com/btc/blocks)

> Warning: if the getblockcount command stops working, it could mean your Bitcoin node crashed due to insufficient memory on your Linux computer.

> ‍For reference: here's a list of commands you can use on your bitcoin node: [Chain Query list of commands for bitcoin-cli](https://chainquery.com/bitcoin-cli).

When your node has finished downloading and is up to date with the Bitcoin blockchain, the number returned from getblockcount will be equal to the actual blockchain block height. In the meantime, you can move forwards to the next steps.

#### 2) Install NodeJS and NPM

**About**

Next, NodeJS needs to be installed on your Linux server. NodeJS is used for the modules that interact with the Bitcoin node.

**Steps**

**a)** Install Git on your Linux server (Homebrew requires Git to be installed):
```
sudo apt install git
```
OR
```
sudo yum install git
```

**b)** Install and Configure Homebrew

First run:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Then run:
```
sudo apt-get install build-essential
```
OR
```
sudo yum groupinstall 'Development Tools'
```

Then run:
```
echo 'eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >> /home/<PUT COMPUTER USER NAME HERE (e.g. ec2-user)>/.bash_profile
eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
```

Homebrew also recommends running these commands:
```
brew install gcc
export LDFLAGS="-L/home/linuxbrew/.linuxbrew/opt/isl@0.18/lib"
export CPPFLAGS="-I/home/linuxbrew/.linuxbrew/opt/isl@0.18/include"
export PKG_CONFIG_PATH="/home/linuxbrew/.linuxbrew/opt/isl@0.18/lib/pkgconfig"
```

**c)** Install NodeJS and NPM with Homebrew

Run the following commands:
```
brew install node@12
echo 'export PATH="/home/linuxbrew/.linuxbrew/opt/node@12/bin:$PATH"' >> /home/<PUT COMPUTER USER NAME HERE (e.g. ec2-user)>/.bash_profile
export LDFLAGS="-L/home/linuxbrew/.linuxbrew/opt/node@12/lib"
export CPPFLAGS="-I/home/linuxbrew/.linuxbrew/opt/node@12/include"
```

Try typing in `node` in your CLI and see if your CLI turns into a NodeJS REPL interface. If not, try reconnecting to your Linux server. It's possible that will trigger NodeJS to be activated.

**d)** Install pm2 Globally

To install [pm2](https://pm2.keymetrics.io/) globally, run the following `npm` command:
```
npm install pm2@latest -g
```

Next, install [pm2-logrotate](https://www.npmjs.com/package/pm2-logrotate) with the following `pm2` command:
```
pm2 install pm2-logrotate
```

#### 3) Install and Start MongoDB

**About**

MongoDB is used locally on your Bitcoin-Api Bitcoin node server for caching. It prevents unnecessary non local server database writes to the main cloud database when updating addresses and balances.

These instructions will go through setting up MongoDB on an Amazon Linux server. If your machine is not an Amazon Linux, you can find the appropriate instructions here in the [official MongoDB Linux installation instructions](https://docs.mongodb.com/manual/administration/install-on-linux/).

**Steps**

**a)** Set Up Linux Server for MongoDB

Add the following as a file at this location, `/etc/yum.repos.d/mongodb-org-4.2.repo`, on your Linux server:
```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```
> This file can be added using the `touch` and `nano` CLI commands. You may need to use `sudo` in front of those commands for admin access.

**b)** Install and Start `mongod` MongoDB Base Process

Install MongoDB with this CLI command:
```
sudo yum install -y mongodb-org
```

Start the `mongod` base process:
```
sudo systemctl start mongod
```

You can verify that the `mongod` base processes has started successfully with: 
```
sudo systemctl status mongod
```


#### 4) Set Up Bitcoin-Api Bitcoin Node Backend

**About**

This section deals with set up for deployment to a remote Linux server. The deployment method used is called Giraffe Lick Leaf (GLL). The way GLL deployment works is you input a deploy command on your home computer that specifies a NodeJS service for the Bitcoin node. The deploy command triggers your home computer to send the most recent code for the specified NodeJS service to the remote Linux server. The Linux server accepts and installs the NodeJS service if it doesn't already exist, or it updates the existing service. 

This section goes through how to set up the Bitcoin-Api Bitcoin node backend for deployment. The main task is to transfer the Tree Deploy🌲🌳 code to the Linux server. The tree deploy code runs on your Linux server and it accepts and install the incoming code sent from your home computer.


**Steps**

**a)** Set Up Files and Folders

Set up the appropriate files and folders using the following CLI commands:
```
touch currentWithdrawReports.txt
mkdir tigerScript
mkdir treeDeploy
mkdir treeDeploy/giraffeDeploy
```

and in staging:
```
mkdir treeDeploy/stagingCredentials
```
OR

in production:
```
mkdir treeDeploy/productionCredentials
```

**b)** Set Up AWS Resources

This section goes over the AWS resources that are needed to operate the backend.

##### Backend IAM Policies

Here are the [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that are needed for Bitcoin-Api's backend. The naming for the staging IAM policies are the same except for `_staging` is appended to the policy name.

[AWS IAM Policy Management Console](https://console.aws.amazon.com/iam/home#/policies)


`bitcoin_api_function_addTransactionAndUpdateExchangeUser`

* [Staging Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/staging/bitcoin_api_function_addTransactionAndUpdateExchangeUser_staging.json)

* [Production Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/production/bitcoin_api_function_addTransactionAndUpdateExchangeUser.json)

`bitcoin_api_user_calzoneSun`

* [Staging Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/staging/bitcoin_api_user_calzoneSun_staging.json)

* [Production Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/production/bitcoin_api_user_calzoneSun.json)

`bitcoin_api_user_feeFee`

* [Staging Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/staging/bitcoin_api_user_feeFee_staging.json)

* [Production Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/production/bitcoin_api_user_feeFee.json)

`bitcoin_api_user_korg`

* [Staging Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/staging/bitcoin_api_user_korg_staging.json)

* [Production Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/production/bitcoin_api_user_korg.json)

`bitcoin_api_user_theomega`

* [Staging Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/staging/bitcoin_api_user_theomega_staging.json)

* [Production Policy](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/policies/aws/production/bitcoin_api_user_theomega.json)


##### Backend IAM Users

Next, the [AWS IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Bitcoin-Api's backend need to be set up. The naming for the staging IAM users are the same except for `_staging` is appended to the user name.

[AWS IAM User Management Console](https://console.aws.amazon.com/iam/home#/users)

**Calzone Sun User**

user name: `bitcoin_api_calzoneSun`

policies: `bitcoin_api_user_calzoneSun`


**Fee Fee User**

user name: `bitcoin_api_feeFee`

policies: `bitcoin_api_user_feeFee`


**Korg User**

user name: `bitcoin_api_korg`

policies: `bitcoin_api_user_korg`, `bitcoin_api_function_addTransactionAndUpdateExchangeUser`


**TheOmega User**

user name: `bitcoin_api_theomega`

policies: `bitcoin_api_user_theomega`, `bitcoin_api_function_addTransactionAndUpdateExchangeUser`


##### Backend DynamoDB Tables

This section describes the required [AWS DynamoDB](https://aws.amazon.com/dynamodb) production tables for Bitcoin-Api. The staging tables are the same except for `_staging` is appended on the table name.

[AWS DynamoDB Management Console](https://console.aws.amazon.com/dynamodb/home)

| Table Name | Partition Key (type) | Sort Key (type ) | 
|--|--|--|
| bitcoin_api_addresses | userId (string) | address (string) | 
| bitcoin_api_balances | userId (string) | - | 
| bitcoin_api_exchangeUsers | userId (string) | - | 
| bitcoin_api_loginTokens | exchangeUserId (string) | expiryTime (number) | 
| bitcoin_api_metadata | key (string) | - |
| bitcoin_api_transactions | exchangeUserId (string) | transactionId (string) |
| bitcoin_api_users | userId (string) | - |
| bitcoin_api_withdraws | userId (string) | ultraKey (number) |


##### Backend DynamoDB Secondary Indexes

| Table Name | Index Name | Partition Key (type) | Sort Key (type ) |
|--|--|--|--|
| bitcoin_api_addresses | address-index | address (string) | - |
| bitcoin_api_exchangeUsers | email-index | email (string) | - |
| bitcoin_api_transactions | exchangeUserId-creationDate-index | exchangeUserId (string) | creationDate (number) |
| bitcoin_api_withdraws | state-creationDate-index | state (string) | creationDate (number) |


##### Backend S3 Storage Bucket

This section goes over how to set up the required [AWS S3](https://aws.amazon.com/s3) production bucket for Bitcoin-Api. The staging bucket is the same except for `_staging` is appended onto the bucket name (recommended for simplicity, although it's not necessary and the S3 staging bucket can have a completely different name if wanted).

[AWS S3 Management Console](https://console.aws.amazon.com/s3/home)

**Steps to Set Up Bitcoin-Api S3 Bucket (Staging or Production)**

1. Create a bucket in S3

2. Create a folder on the root level of that bucket and call it `qr_codes`. This is the folder where the Bitcoin address QR code images are stored.


**c)** Set Up Backend .env Environment Variable Files

The following environment files need to be created and set up:


**Calzone Sun**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/calzoneSun/.env`

.env Template: [Calzone Sun .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/calzoneSun.env)


**Fee Fee**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/FeeFee/.env`

.env Template: [Fee Fee .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/feeFee.env)


**Giraffe**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/giraffe/.env`

.env Template: [Giraffe .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/giraffe.env)


**Korg**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/korg/.env`

.env Template: [Korg .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/korg.env)


**The Omega**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/theomega/.env`

.env Template: [The Omega .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/theomega.env)


**Tree**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/tree/.env`

.env Template: [Tree .env Template File](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/environment/dotenv-templates/1-backend/tree.env)


**d)** Send and Start Initial NodeJS Services Modules

For this step, you will manually send and start up the NodeJS service modules (a.k.a. "The Tigers"). This is only necessary for the initial setup and after this the Giraffe Lick Leaf (GLL) deployment can be used for instant deploys with a single simple command.

For this command you will need to create a `/infrastructure/scripts/1-backend/setUpTigers.sh` pre-gitignored set up command file using the provided [`/infrastructure/scripts/1-backend/setUpTigers.template.sh` template file](https://github.com/bitcoin-api/bitcoin-api-full-stack/blob/master/infrastructure/scripts/1-backend/setUpTigers.template.sh).

A chart is provided showing how to replace the template placeholder values in detail:

| value to update  | meaning | example |
|--|--|--|
| mode | environment | either staging or production |
| pemPath | path on your home computer to your Linux server's .pem access key file | /Users/user-name/user-files/super-secret-path/linux-server-access-file.pem |
| sourceRepoPath | the path on your home computer to where your `bitcoin-api-full-stack` repo is located (this repo!😎) | /Users/user-name/my-code-folder/bitcoin-api-full-stack |
| destinationUserName | the user name you use to access your Linux server | ec2-user |
| destinationUrl | the URL of your Linux server | ec2-instance-name.ec2-instance-region.compute.amazonaws.com |
| destinationHomePath | the home path on your Linux server for your Linux user | /home/ec2-user |

After the values have been replaced, run the `/infrastructure/scripts/1-backend/setUpTigers.sh` command to transport the NodeJS service modules from your home computer to your Linux server.

In the `/infrastructure/scripts/1-backend` folder in your CLI, run:

```
./setUpTigers.sh
```
> note: you may need to run `chmod 777 ./setUpTigers.sh` first before running the set up script

After the modules have been transported to your Linux server, it's time to start them up!


#### Here's the instructions to manually run your NodeJS services:

**Calzone Sun (manually triggered)**

This NodeJS service adds unused addresses to the system. Run the following commands in the `/[Linux user home path]/tigerScript/calzoneSun` path on your Linux server:

If not already, install the Calzone Sun node modules with:
```
npm install
```

Then, to add new addresses to your Bitcoin-Api system, you can run the following command:
```
node AddUnusedAddress [number of addresses to add, defaults to 1]
```

or in production:
```
node AddUnusedAddress.js [number of addresses to add, defaults to 1] --mode=production
```

**Fee Fee (runs in infinite loop)**

This NodeJS service updates your Bitcoin-Api system's fee data which includes the fee itself in terms of how much the user pays on Bitcoin withdraw. This service is managed by pm2. To set up the NodeJS fee data service, in the `/[Linux user home path]/tigerScript/feeFee` path on your Linux server, first install the node modules:

```
npm install
```

Then, run the following command to start up the NodeJS fee data service:
```
pm2 start UpdateFeeDataWorker.js
```

or in production:
```
pm2 start UpdateFeeDataWorker.js -- --mode=production
```

You can also test the service without pm2 using:
```
node UpdateFeeDataWorker
```

or:
```
node UpdateFeeDataWorker --mode=production
```

After the main function finishes, it starts again after 10 seconds to keep the fee up to date in your Bitcoin-Api system.

When the main function has finished, it should look like this:

<img
    src="https://bitcoin-api.s3.amazonaws.com/images/documentation/fee-fee-successful-execution.png"
    width="800"
/>

To watch your service's logs, first use this pm2 command:
```
pm2 list
```

and see which is the number associated with the `UpdateFeeDataWorker.js` process, in this case. Running this command also provides other useful data associated with your pm2 processes.

Next, to view the fee data worker logs in realtime, run:
```
pm2 logs [the number of your NodeJS service's process]
```
You can optionally sign up and log in to pm2's web services and see your NodeJS service's logs in your browser, in realtime, using the [pm2 webapp](https://app.pm2.io/).

This pm2 command can also be used to monitor your fee data service and all your other pm2 services:
```
pm2 monit
```

> **Important Note:** In the file `/1-backend/feeFee/updateFee.js`, you can adjust the fee levels using the `getFeeData` function. As a result of the fast seamless Giraffe Lick Leaf deployments, it's possible to do fast changes of what the fee is!! At the backend level... wow!!!😲🤠🧐👁

> **Errors:** If the service stops working or if you see any errors, particularly as soon as you first run the service, it could be possible there's a misconfiguration. It's also possible there could be a network, a blockchain, or a cloud service provider error. The logs will provide details about the cause of any error that occurs.

This updates the [AWS DynamoDB](https://console.aws.amazon.com/dynamodb/home) `bitcoin_api_metadata_staging` or `bitcoin_api_metadata` table with the new fee data. The key associated with the fee data in the metadata table is `fee`. The actual fee the user pays is calculated as follow:
```
Values stored in the DynamoDB database entry:
amount,
multiplier,
blessing fee,
trinity fee,
sacrament fee

Calculation:

base fee = (amount x multiplier)
holy fee = (blessing fee + trinity fee + sacrament fee)

fee to pay = (base fee + holy fee)
```

Please consider contributing a portion of the fee you collect towards the environment, thank you very much!🌲🌳🌄😇

<br>

**Korg (runs in infinite loop)** --> TODO:🚧👷‍♂️👷‍♀️🏗

This NodeJS service performs bitcoin withdraws. To set up this pm2 managed NodeJS withdraw Bitcoin worker service, in the `/[Linux user home path]/tigerScript/korg` path on your Linux server, first install the node modules:

```
npm install
```

To run the withdraw Bitcoin worker input the following command:
```
pm2 start WithdrawMoneyDoer.js
```

or in production:
```
pm2 start WithdrawMoneyDoer.js -- --mode=production
```

You can also test the service without pm2 using:
```
node WithdrawMoneyDoer
```

or:
```
node WithdrawMoneyDoer --mode=production
```
<br>

TODO:🚧👷‍♂️👷‍♀️🏗 --> next service instructions

<br>

**e)** Transfer Tree Deploy🌲🌳 Code

This step explains how to set up the tree deploy code.

To transfer the tree deploy code first you must create a `/1-backend/giraffeDeploy/plantTree.sh` file (gitignored). A template is provided at `/1-backend/giraffeDeploy/plantTree.template.sh`.

A chart is provided showing how to replace the template placeholder values:

| value to update  | meaning | example |
|--|--|--|
| \<path-to-pem\>  | path on your home computer to your Linux server's .pem access key file | /Users/mega-monkey/cool_documents/secret_pem_files/mega-monkey-linux.pem |
| \<url\>  | your Linux server's address with your Linux server user's name prepended with an "@" | ec2-user@ec2-mega-monkey-server.mars-space-1.compute.amazonaws.com |
|\<path\>| path on your Linux server to where the tree deploy files are sent, it needs to point to the `/treeDeploy/giraffeDeploy` folder you created in step **a)** | /home/ec2-user/treeDeploy/giraffeDeploy |
|\<path-to-treenv\> | path to environment variables for the tree deploy code, it needs to point to the `/treeDeploy/stagingCredentials` folder or the `/treeDeploy/productionCredentials` folder created in step **a)** | /home/ec2-user/treeDeploy/stagingCredentials |




--- TODO:🚧👷‍♂️👷‍♀️🏗 ---> transfer tree deploy files to Linux server and install node modules for tree deploy on Linux server

----

TODO: 

5. Run Giraffe Lick Leaf deploy script

6. Deploy API

7. --- TODO:🚧👷‍♂️👷‍♀️🏗

---

### How to Deploy Backend

Here is an example video of a live staging deployment for the backend. This video shows the fee update worker being updated using the Giraffe Lick Leaf deployment tool. This deployment provides continuous integration for the backend NodeJS services that interact with the Bitcoin node on the Linux server, the service doesn't need to be shut down or be interrupted:

<a href="https://www.youtube.com/watch?v=ZZ4zdq4AJY8">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png"
        width="85"
    />
</a>


### How to Deploy API

Here is an example video of a live production API deployment. The website contents for [Bitcoin-Api.io](https://bitcoin-api.io) are retrieved using an [AWS Lambda](https://aws.amazon.com/lambda) function:

<a href="https://www.youtube.com/watch?v=8FCWWAyXB8A">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png"
        width="85"
    />
</a>


### How to Deploy Frontend

The frontend code modules are [React](https://reactjs.org) webapps made with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). They can be deployed in the same way as any other React webapp. The deployment tool currently used for the webapp in the [exchange and casino video demo](https://youtu.be/EMAwIrHM2Qc) is [AWS Amplify](https://aws.amazon.com/amplify) using its monorepo functionality.


Notes:
* This repo itself is a work in progress with the aim of generalizing, speeding up, and simplifying setting up Bitcoin-Api instances (which includes the API, exchange, and casino).
* PRs and collaborative efforts welcome.👏

Sponsor this page and get priority support and other awesome benefits😁: [Bitcoin-Api GitHub Sponsor Page](https://github.com/sponsors/bitcoin-api)



### Credits:

**Coding:** [Michael Stecky-Efantis](https://www.linkedin.com/in/bitcoin-api) - contact for enterprise Bitcoin-Api Bitcoin and crypto services - add crypto to your business!

**Art Design:** [Azubuike Nwadike](https://www.facebook.com/xbilldn) - contact to hire for excellent quality design and art work
