# Bitcoin-API-Full-Stack

[![Bitcoin-API-Full-Stack](https://bitcoin-api.s3.amazonaws.com/images/visual_art/so-splush-bee-and-lamby-full-stack-banner-37.png)](#bitcoin-api-full-stack)

#### Complete Code Base for Bitcoin-API

<br>

## Demos

### Live

* **[TestnetDashboard.com](https://testnetdashboard.com)** - testnet demo of exchange and game technology

### Video

*  **[Withdraw, Video on Twitter](https://twitter.com/Bitcoin_Api_io/status/1294575054479654913/video/1)** - withdrawing Bitcoin from Bitcoin-API instance using Postman

* **[12 Withdraws, Video on Youtube](https://www.youtube.com/watch?v=eIwgwse94Sg)** - 12 concurrent Bitcoin withdraws from Bitcoin-API instance using a NodeJS script

* **[Exchange and Game Technology, Video on YouTube](https://youtu.be/EMAwIrHM2Qc)** - exchange and game technology

<br>

## Introduction

This code repository, *Bitcoin-API-Full-Stack*, is a JavaScript/NodeJS full stack Bitcoin and digital currency API ([see below](#about-apis-and-bitcoin-apis) for info about what APIs are), exchange, and game platform. The term "full stack" in the title means that all the instructions and all the components are in this repository so you can build your own Bitcoin-API system from scratch and you can build every aspect of it from computer server to phone webapp. This system lets people have their own versions of Bitcoin and digital currency APIs, exchanges, and game platforms instead of only having other people's technologies and companies to use. Bitcoin-API-Full-Stack is also designed so that even an individual can have control over these financial technologies instead of needing a big team or a company.

#### About APIs and Bitcoin APIs

Application programming interfaces (APIs) allow developers to build technology that connects across the internet in a systematic way using URLs and internet requests from computers to those URLs. An example of this is sending a Tweet on Twitter from your phone, which is the computer in this case. Your phone makes an internet request to the Twitter API URL which is then responsible for creating Tweets.

What this Bitcoin and digital currency API allows you to do is to easily send and receive Bitcoin using simple URLs. This lets developers program Bitcoin functionality into whatever technology they want, such as exchanges, wallet apps, IoT devices, or anything connected to the internet.

In this Bitcoin-API system, the Bitcoin itself is stored on a Bitcoin node (Bitcoin node set up instructions provided) and the API connects to the Bitcoin node. Overall, your apps and your tech connect to the API and then the API connects to the Bitcoin node which is on your computer server.

The Bitcoin node and the API are considered to be the "backend" of the "stack" in the "full stack" concept. When implemented, the backend code and the associated data is on your computer servers and is not publicly accessible by users.

The "frontend" exchange and game webapp set up instructions and code are provided. The webapp connects to your built Bitcoin-API backend. The webapp code is a processed version of the frontend code which is sent to users' devices which implies the webapp code is publicly accessible. Frontend webapp users retrieve data that they're authorized to access, such as their Bitcoin balance data, from the backend.

It's important to note that even though all the code in this repository is publicly accessible, an implementation of this system is still secure because you still need the system's backend access keys to access the private data (other than the case of a user getting their own private data with their tokens and passwords, which does not need the backend access keys).


## API, Exchange, and Game Features

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

This code repository, *Bitcoin-API-Full-Stack*, is a code repository for anybody, even an individual,
to have their own Bitcoin and digital currency management technology. Instead of needing a big team or company to manage a Bitcoin and digital currency wallet app,
exchange, or game platform, Bitcoin-API-Full-Stack allows individuals to have complete control over
these financial technologies.


### Bitcoin Node Servers

**Architecture Outline**

* Linux Server
  * Bitcoin-Core
  * MongoDB
  * pm2 Instances:
    * withdraw bitcoin bot
    * update deposit data bot
    * update fee data bot
    * pm2-logrotate 

**Summary of How the Bitcoin Node Servers Work**

The NodeJS services interact with the Bitcoin node which in turn interacts with the Bitcoin blockchain. Overall, this means the NodeJS services gather data from the Bitcoin blockchain. The NodeJS services then perform the required actions on the Bitcoin-API database. For example the fee data bot gets an estimate for the fee from the Bitcoin blockchain and updates the Bitcoin-API database with that fee. That fee estimate can then be retrieved publicly using the `/fee-data` API endpoint.

### How to Set Up the Backend


#### Requirements:

* Have a Mac or Linux server, this can be a computer in your home, or in the cloud (e.g. an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)). The Linux server must meet [Bitcoin Core's computer requirements](https://bitcoin.org/en/bitcoin-core/features/requirements). You need to have access to the server. This means you should be able to access a command-line or terminal in that server using [ssh](https://en.wikipedia.org/wiki/Secure_Shell). You can also manually install the backend on a computer locally without ssh, that computer just needs to stay running and connected to the internet for the services to remain active.

* On the computer you're working on (e.g. your home computer), clone or download this Bitcoin-API-Full-Stack code repository. This repo is like the "command center" for your Bitcoin-API instance. Set up, deployment, and other useful commands are performed using the files and scripts in this repo.

* Have a Redis service that you can access using a URL. [Redis Labs](https://redislabs.com) provides great Redis services.


### Set Up The Bitcoin Node Server(s)

The backend node server is responsible for updating the database. The backend node server has three main functions:

1. Update the fee data

2. Update the bitcoin deposit data, this includes user balance data

3. Perform bitcoin withdraws


> About multiple servers:
You can set up multiple backend servers if you have lots and lots of addresses although you only need one backend server, even if you have a few hundred thousand addresses. (This hasn't been tested yet although this is according to what [Andreas Antonopoulos](https://aantonop.com/) said. It should be taken into consideration that this claim was made in 2019 and that the tech is always improving.)


#### Steps to Setup a Bitcoin-API Bitcoin Node Server

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

MongoDB is used locally on your Bitcoin-API Bitcoin node server for caching. It prevents unnecessary non local server database writes to the main cloud database when updating addresses and balances.

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


#### 4) Set Up Bitcoin-API Bitcoin Node Backend

**About**

This section deals with set up for deployment to a remote Linux server. The deployment method used is called Giraffe Lick Leaf (GLL). The way GLL deployment works is you input a deploy command on your home computer that specifies a NodeJS service for the Bitcoin node. The deploy command triggers your home computer to send the most recent code for the specified NodeJS service to the remote Linux server. The Linux server accepts and installs the NodeJS service if it doesn't already exist, or it updates the existing service. 

This section goes through how to set up the Bitcoin-API Bitcoin node backend for deployment. The main task is to transfer the Tree Deploy🌲🌳 code to the Linux server. The tree deploy code runs on your Linux server and it accepts and install the incoming code sent from your home computer.


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

Here's the [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that are needed for Bitcoin-API's backend. The naming for the staging IAM policies is the same except for `_staging` is appended to the policy name.

[AWS IAM Policy Management Console](https://console.aws.amazon.com/iam/home#/policies)

* [`bitcoin_api_user_addressGenerator`](infrastructure/policies/aws/bitcoin_api_user_addressGenerator.json)

* [`bitcoin_api_user_feeDataBot`](infrastructure/policies/aws/bitcoin_api_user_feeDataBot.json)

* [`bitcoin_api_user_withdrawsBot`](infrastructure/policies/aws/bitcoin_api_user_withdrawsBot.json)

* [`bitcoin_api_user_depositsBot`](infrastructure/policies/aws/bitcoin_api_user_depositsBot.json)

* [`bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`](infrastructure/policies/aws/bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser.json)


##### Backend IAM Users

Next, the [AWS IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Bitcoin-API's backend need to be set up. The naming for the staging IAM users is the same except for `_staging` is appended to the user name.

[AWS IAM User Management Console](https://console.aws.amazon.com/iam/home#/users)

**Address Generator User**

user name: `bitcoin_api_addressGenerator`

policies: `bitcoin_api_user_addressGenerator`


**Fee Data Bot User**

user name: `bitcoin_api_feeDataBot`

policies: `bitcoin_api_user_feeDataBot`


**Withdraws Bot User**

user name: `bitcoin_api_withdrawsBot`

policies: `bitcoin_api_user_withdrawsBot`, `bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`


**Deposits Bot User**

user name: `bitcoin_api_depositsBot`

policies: `bitcoin_api_user_depositsBot`, `bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`


##### Backend DynamoDB Tables

This section describes the required [AWS DynamoDB](https://aws.amazon.com/dynamodb) production tables for Bitcoin-API. The staging tables are the same except for `_staging` is appended on the table name.

[AWS DynamoDB Management Console](https://console.aws.amazon.com/dynamodb/home)

| Table Name | Partition Key (type) | Sort Key (type ) | 
|--|--|--|
| bitcoin_api_addresses | userId (string) | address (string) | 
| bitcoin_api_exchangeEmailDeliveryResults | email (string) | creationDate (number) | 
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


#### About the Database

In the Bitcoin-API system, some DynamoDB database operations are queued with [Dr. Q👨🏿‍🔬](https://github.com/bitcoin-api/drq) to prevent conflicting updates. For preciseness, the locking queues will be called *Q-Locks👨🏿‍🔬* in this documentation.

#### About Dr. Q's Q-Locks👨🏿‍🔬

Q-Locks run the operations their locking in series as opposed to running them concurrently in parallel. If an operation is in a Q-Lock and another operation with the same Q-Lock attempts to be performed, the second operation will have to wait until the first operation has finished in its own Q-Lock. A Q-Lock is identified in Bitcoin-API using a string with the following format `{type}:{id}`. An example of this would be the Q-Lock used in the `POST /withdraws` endpoint whose identifier is `withdraws:user_id`. This endpoint starts the withdraw process for a user attempting to make a withdraw. What having the Q-Lock on this withdraw operation means is that for an individual user, a second withdraw operation can only occur after the first withdraw operation has finished, this prevents double spends.👨🏿‍🔬

Below lists in detail which operations specifically are in Q-Locks.


#### Dr. Q's DynamoDB Database API Q-Locks👨🏿‍🔬

> Terminology:
>
> `add exchange transaction` - Adds an exchange transaction entry to the append only DynamoDB table "bitcoin_api_transactions". The balance information  for a user is calculated by reviewing and processing all of the entries added for that user.
>
> `real deal the withdraw` - Refunds the unused Blockchain withdraw fee if the fee estimate is higher than the actual fee.


<table>
  <tbody>
    <tr>
      <th>Q-Lock👨🏿‍🔬</th>
      <th>Component</th>
      <th>Actions</th>
    </tr>
    <tr>
      <td>withdraws:user_id</td>
      <td align="center">POST/withdraws</td>
      <td>
        <ul>
          <li>invoke withdraw (withdraw part 1/4)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>withdraws:user_id</td>
      <td align="center">withdraws bot</td>
      <td>
        <ul>
          <li>do withdraw from Bitcoin node (withdraw part 2/4)</li>
          <li>real deal the withdraw (withdraw part 3/4 - skip if error in part 2/4)</li>
          <li>verify withdraw (withdraw part 4/4)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>balances:user_id</td>
      <td align="center">POST/withdraws</td>
      <td>
        <ul>
          <li>do withdraw (withdraw part 1/4)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>balances:user_id</td>
      <td align="center">withdraws bot</td>
      <td>
        <ul>
          <li>verify withdraw (withdraw part 4/4)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>balances:user_id</td>
      <td align="center">deposits bot</td>
      <td>
        <ul>
          <li>deposits bot</li>
        </ul>
      </td>
    </tr>
    <tr>
    <td>addresses:user_id</td>
    <td align="center">POST/addresses</td>
    <td>
    <ul>
        <li>get or assign fresh address, includes assign first address</li>
    </ul>
    </td>
    </tr>
    <tr>
      <td>users:user_id</td>
      <td align="center">POST/addresses</td>
      <td>
        <ul>
          <li>assign first address</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>users:user_id</td>
      <td align="center">PUT/tokens</td>
      <td>
        <ul>
          <li>update token value</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


#### Dr. Q's DynamoDB Database Exchange Q-Locks👨🏿‍🔬

<table>
  <tbody>
    <tr>
      <th>Q-Lock👨🏿‍🔬</th>
      <th>Component</th>
      <th>Actions</th>
    </tr>
    <tr>
      <td>exchangeUsers:email</td>
      <td align="center">POST/verify-user</td>
      <td>
        <ul>
          <li>verify email</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeEmailDeliveryResults:email</td>
      <td align="center">handle exchange email delivery results</td>
      <td>
        <ul>
          <li>add exchange email delivery result data to database</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">POST/login</td>
      <td>
        <ul>
          <li>assign bitcoin address (only for first login)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">DELETE/exchange-users/:exchangeUserId</td>
      <td>
        <ul>
          <li>delete user</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">deposits bot</td>
      <td>
        <ul>
          <li>update Bitcoin deposit info [add exchange transaction]</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">POST/withdraws</td>
      <td>
        <ul>
          <li>start withdraw (exchange withdraw part 1/5) [add exchange transaction]</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">withdraws bot</td>
      <td>
        <ul>
          <li>finalize withdraw (exchange withdraw part 5/5) [add exchange transaction]</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">POST/exchanges</td>
      <td>
        <ul>
          <li>do exchange [add exchange transaction]</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>exchangeUsers:exchangeUserId</td>
      <td align="center">POST/dreams</td>
      <td>
        <ul>
          <li>enchanted function ✨🧞‍♀️✨ [add exchange transaction]</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>vanguard_withdraws:exchangeUserId</td>
      <td align="center">withdraws bot</td>
      <td>
        <ul>
            <li>withdraw from Bitcoin node (exchange withdraw 
          part 2/5) </li>
            <li>real deal the withdraw (exchange withdraw part 3/5) </li>
            <li>verify withdraw (exchange withdraw part 4/5) </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


#### Redis Keys and Values

| Key | Type | Value
|--|--|--|
| Q | stream - max length 300000 | all [Dr. Q👨🏿‍🔬](https://github.com/bitcoin-api/drq) operations |
| ipAddressRateLimiterQueueId | stream - max length 200000 | rate limit by ip address (per endpoint per ip address) |
| advancedCodeRateLimiterQueueId | stream - max length 200000 | rate limit by advanced code (per endpoint per advanced code) |
| bankStatusQueueId | stream - max length 2000 | The NodeJS services periodically send requests to this queue to indicate whether they're active or not. This is used by the API to determine if the entire Bitcoin-API system is active or not. If the system is not active, all the API endpoints will respond with an error indicating the service is currently unavailable. |
| cacheOnAndOffStatus | stream - max length 1000 | cache for on and off status of API, you can edit a database value to switch the entire API off or back on |
| zarbonDeploy | stream - max length 1000 | Giraffe Lick Leaf (GLL) deploy queue |
| unusedAddressData | list of encoded JSON objects | contains unused address data, this data including the address itself is assigned to users (equivalently Bitcoin-API tokens) when they make requests to the `POST - /addresses` endpoint |


##### Backend S3 Storage Bucket

This section goes over how to set up the required [AWS S3](https://aws.amazon.com/s3) production bucket for Bitcoin-API. The staging bucket is the same except for `_staging` is appended onto the bucket name (recommended for simplicity, although it's not necessary and the S3 staging bucket can have a completely different name if wanted).

[AWS S3 Management Console](https://console.aws.amazon.com/s3/home)

**Steps to Set Up Bitcoin-API S3 Bucket (Staging or Production)**

1. Create a bucket in S3

2. Create a folder on the root level of that bucket and call it `qr_codes`. This is the folder where the Bitcoin address QR code images are stored.


**c)** Set Up Backend .env Environment Variable Files

The following environment files need to be created and set up:


**Address Generator**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/addressGenerator/.env`

.env Template: [Address Generator .env Template File](infrastructure/environment/dotenv-templates/1-backend/addressGenerator.env)


**Fee Data Bot**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/feeDataBot/.env`

.env Template: [Fee Data Bot .env Template File](infrastructure/environment/dotenv-templates/1-backend/feeDataBot.env)


**Withdraws Bot**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/withdrawsBot/.env`

.env Template: [Withdraws Bot .env Template File](infrastructure/environment/dotenv-templates/1-backend/withdrawsBot.env)


**Deposits Bot**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/depositsBot/.env`

.env Template: [Deposits Bot .env Template File](infrastructure/environment/dotenv-templates/1-backend/depositsBot.env)


**Giraffe**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/giraffe/.env`

.env Template: [Giraffe .env Template File](infrastructure/environment/dotenv-templates/1-backend/giraffe.env)


**Tree**

.env path: `/1-backend/<stagingCredentials OR productionCredentials>/tree/.env`

.env Template: [Tree .env Template File](infrastructure/environment/dotenv-templates/1-backend/tree.env)


**d)** Send and Start Initial NodeJS Services Modules

For this step, you will manually send and start up the NodeJS service modules (a.k.a. "The Tigers"). This is only necessary for the initial setup and after this the Giraffe Lick Leaf (GLL) deployment can be used for instant deploys with a single simple command.

For this command you will need to create a `/infrastructure/scripts/1-backend/setUpTigers.sh` pre-gitignored set up command file using the provided [`/infrastructure/scripts/1-backend/setUpTigers.template.sh` template file](infrastructure/scripts/1-backend/setUpTigers.template.sh).

A chart is provided showing how to replace the template placeholder values in detail:


#### Set Up Tigers Configuration Chart

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

**Address Generator (manually triggered)**

This NodeJS service adds unused addresses to the system. Run the following commands in the `/[Linux user home path]/tigerScript/addressGenerator` path on your Linux server:

If not already, install the address generator node modules with:
```
npm install
```

Then, to add new addresses to your Bitcoin-API system, you can run the following command:
```
node AddUnusedAddress [number of addresses to add, defaults to 1]
```

or in production:
```
node AddUnusedAddress.js [number of addresses to add, defaults to 1] --mode=production
```

Adding an address to your Bitcoin-API system will look like this:
![Address Generator Creating New Bitcoin Address](https://bitcoin-api.s3.amazonaws.com/images/documentation/calzone-sun-successfully-added-address.png)

<br>

**Fee Data Bot (runs in infinite loop)**

This NodeJS service updates your Bitcoin-API system's fee data which includes the fee itself in terms of how much the user pays on Bitcoin withdraw. This service is managed by pm2. To set up the NodeJS fee data service, in the `/[Linux user home path]/tigerScript/feeDataBot` path on your Linux server, first install the node modules:

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

After the main function finishes, it starts again after 10 seconds to keep the fee up to date in your Bitcoin-API system.

When the main function has finished, it should look like this:

<img
    src="https://bitcoin-api.s3.amazonaws.com/images/documentation/fee-fee-successful-execution-2.png"
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

> **Important Note:** In the file [`/1-backend/feeDataBot/updateFee.js`](1-backend/feeDataBot/updateFee.js), you can adjust the fee levels using the `getFeeData` function.

> **Errors:** If the service stops working or if you see any errors, particularly as soon as you first run the service, it could be possible there's a misconfiguration. It's also possible there could be a network, a blockchain, or a cloud service provider error. The logs will provide details about the cause of any error that occurs.

This updates the [AWS DynamoDB](https://console.aws.amazon.com/dynamodb/home) `bitcoin_api_metadata_staging` or `bitcoin_api_metadata` table with the new fee data. The key associated with the fee data in the metadata table is `fee`. The actual fee the user pays is calculated as follows:
```
Values stored in the DynamoDB database entry:
amount,
multiplier,
business fee data object of the form:
{
    [custom fee key 1]: {
        amount: x
    },
    [custom fee key 2]: {
        amount: y
    },
    ...
    [custom fee key n]: {
        amount: z
    }
}
where 0 <= x,y,z and x,y,z are real numbers

Calculation:

blockchain fee estimate = (amount x multiplier)
business fee = sum of the "businessFeeData" object's fee amounts

fee estimate to pay = (blockchain fee estimate + business fee)
```
This is a fee estimate because if the actual blockchain fee needed and used is less than the blockchain fee estimate, any unused blockchain fee from the estimate in the actual Bitcoin node withdraw will get refunded to the user after the Bitcoin node withdraw has finished.

For example, if the blockchain fee estimate is 0.0001 BTC and only 0.00003 BTC is needed for the Bitcoin node withdraw blockchain fee, then 0.00007 BTC will be refunded to the user.


#### EnviroWithdraws

EnviroWithdraws are intended for collecting money for our environment. The `POST - /withdraws` endpoint has an optional request body Bitcoin amount parameter `enviroWithdrawAmount`. The `enviroWithdrawAmount` parameter automatically adds its value to the `businessFeeData` object with the custom key `enviroWithdraw` whose corresponding object value contains the specified `enviroWithdrawAmount`.

Here's an example of the resulting `businessFeeData` with an `enviroWithdrawAmount` of 0.000001 BTC specified in the request body:
```.js
{
    {...},
    ...
    enviroWithdraw: {
        amount: 0.000001
    }
}
```

EnviroWithdraw or not, Bitcoin-API suggests to please consider contributing a portion of the fees you collect towards the environment and thank you very much for considering our environment!🌲🌳🌄

<br>


**Deposits Bot (runs in infinite loop)**

This NodeJS service updates Bitcoin addresses and user balances for Bitcoin deposits to Bitcoin-API addresses. To set up this pm2 managed NodeJS Bitcoin deposit worker service, in the `/[Linux user home path]/tigerScript/depositsBot` path on your Linux server, first install the node modules:

```
npm install
```

To run the Bitcoin deposit worker, input the following command:
```
pm2 start UpdateDepositData.js
```

or in production:
```
pm2 start UpdateDepositData.js -- --mode=production
```

You can also test the service without pm2 using:
```
node UpdateDepositData
```

or:
```
node UpdateDepositData --mode=production
```

A successful iteration of the Bitcoin deposit worker should look like this:

![Update Deposit Data Worker Successful Execution](https://bitcoin-api.s3.amazonaws.com/images/documentation/theomega-successful-execution.png)


<br>


**Withdraws Bot (runs in infinite loop)**

This NodeJS service performs Bitcoin withdraws. To set up this pm2 managed NodeJS withdraw Bitcoin worker service, in the `/[Linux user home path]/tigerScript/withdrawsBot` path on your Linux server, first install the node modules:

```
npm install
```

To run the withdraw Bitcoin worker, input the following command:
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

When an iteration of the withdraw Bitcoin worker completes, it should look like this:

![Withdraw Money Doer Successful Execution](https://bitcoin-api.s3.amazonaws.com/images/documentation/korg-successful-execution.png)

<br>

**e)** Transfer Tree Deploy🌲🌳 Code

This step explains how to set up the tree deploy code.

To transfer the tree deploy code first you must create a `/infrastructure/scripts/1-backend/plantTree.sh` file (pre-gitignored). A template file is provided at [`/infrastructure/scripts/1-backend/plantTree.template.sh`](infrastructure/scripts/1-backend/plantTree.template.sh).

Refer to the [Set Up Tigers Configuration Chart](#set-up-tigers-configuration-chart) for details on how to configure the required values which are the same for `plantTree.sh`.

After you've set up your `plantTree.sh` file, transfer your tree deploy files to your Linux server by running the following command in the `/infrastructure/scripts/1-backend` folder:
```
./plantTree.sh
```
> note: you may need to run `chmod 777 ./plantTree.sh` first before running the plant tree script

Now, in your Linux server, go to the `/[Linux user home path]/treeDeploy/giraffeDeploy/tree` folder and install the node modules for your tree deployment code with:
```
npm install
```

You can test that the transfer and set up of your tree deploy code went successfully by running the following command:
```
node WaterTree
```

or in production:
```
node WaterTree --mode=production
```

It will look like this:
![Water Tree No-Op](https://bitcoin-api.s3.amazonaws.com/images/documentation/water-tree-no-op.png)


And that's it, your Bitcoin-API backend Bitcoin node server is now operational and is also ready for ultra-fast Giraffe Lick Leaf deployments! See more on this in the next step.


<br>

### How to Deploy Backend

Now that we've got our Bitcoin-API backend Bitcoin node server up and running, let's go over how to do a super fast Giraffe Lick Leaf (GLL) deployment to instantly update your backend NodeJS services!

First, in your Linux server at `/[Linux user home path]/treeDeploy/giraffeDeploy/tree`, run:
```
node WaterTree
```

or in production:
```
node WaterTree --mode=production
```

This command will start up your tree code acceptor and installer. 


Now, on your home computer in one of the `/infrastructure/scripts/1-backend/giraffeLickLeaf/feeDataBot`, `/infrastructure/scripts/1-backend/giraffeLickLeaf/withdrawsBot`, or `/infrastructure/scripts/1-backend/giraffeLickLeaf/depositsBot` folders in this repo, run one of the following commands to do an instant deployment of a NodeJS service:

##### Deploy Backend NodeJS Service with GLL

```
./deployStaging.sh
```

or in production:
```
./deployProduction.sh
```

This will trigger a GLL deployment to update your NodeJS service, here's an example demo video of what the deployment looks like:

<a href="https://www.youtube.com/watch?v=ZZ4zdq4AJY8">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png"
        width="85"
    />
</a>

GLL deployment provides continuous integration for the backend NodeJS services that interact with the Bitcoin node on the Linux server. The overall Bitcoin-API service doesn't need to be shut down or be interrupted.

After you've finished your deployments, you can shut down your Water Tree code acceptor and installer process in your Linux server. To do this simply input the keyboard keys `control` plus `c`.



### How to Deploy API

The API is serverless, it uses [AWS Lambda](https://aws.amazon.com/lambda) functions which are accessed through [API Gateway](https://aws.amazon.com/api-gateway). This section goes over how to set the API up.


**a)** Set Up Environment Variables

Use the [API Environment Variable Template File](infrastructure/environment/dotenv-templates/2-api/api.env), create an environment variable file and add it to `/2-api/stagingCredentials/.env` in staging, and add it to `/2-api/productionCredentials/.env` in production.


**b)** Set Up AWS API Resources

This section goes over the [AWS](https://aws.amazon.com) resources that necessary to set up and run the Bitcoin-API API.


##### API IAM Policies

Here's the [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that are needed for Bitcoin-API's API. The naming for the staging IAM policies is the same except for `_staging` is appended to the policy name.

[AWS IAM Policy Management Console](https://console.aws.amazon.com/iam/home#/policies)


**Built-In AWS Policies Used:**

* `AWSLambdaBasicExecutionRole`


**Custom AWS Policies to Set Up:**

* [`bitcoin_api_user_deployAPIFunctions`](infrastructure/policies/aws/bitcoin_api_user_deployAPIFunctions.json)

* [`bitcoin_api_user_deployExchangeFunctions`](infrastructure/policies/aws/bitcoin_api_user_deployExchangeFunctions.json)

* [`bitcoin_api_eFunction_mongolianBeginningDragonProtection`](infrastructure/policies/aws/bitcoin_api_eFunction_mongolianBeginningDragonProtection.json)

* [`bitcoin_api_role_lambda_api_tokens_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_tokens_post.json)

* [`bitcoin_api_role_lambda_api_tokens_get`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_tokens_get.json)

* [`bitcoin_api_role_lambda_api_tokens_put`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_tokens_put.json)

* [`bitcoin_api_role_lambda_api_addresses_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_addresses_post.json)

* [`bitcoin_api_role_lambda_api_feeData_get`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_feeData_get.json)

* [`bitcoin_api_role_lambda_api_withdraws_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_api_withdraws_post.json)

* [`bitcoin_api_role_lambda_service_cacheOnAndOffStatus`](infrastructure/policies/aws/bitcoin_api_role_lambda_service_cacheOnAndOffStatus.json)

* [`bitcoin_api_role_lambda_eAPI_eUsers_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_eUsers_post.json)

* [`bitcoin_api_role_lambda_eAPI_eUsers_get`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_eUsers_eUserId_get.json)

* [`bitcoin_api_role_lambda_eAPI_eUsers_eUserId_delete`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_eUsers_eUserId_delete.json)

* [`bitcoin_api_role_lambda_eAPI_verifyUser_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_verifyUser_post.json)

* [`bitcoin_api_role_lambda_eAPI_login_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_login_post.json)

* [`bitcoin_api_role_lambda_eAPI_logout_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_logout_post.json)

* [`bitcoin_api_role_lambda_eAPI_withdraws_post`](infrastructure/policies/aws/bitcoin_api_role_lambda_eAPI_withdraws_post.json)

* [`bitcoin_api_role_lambda_eService_handleEEDRs`](infrastructure/policies/aws/bitcoin_api_role_lambda_eService_handleEEDRs.json)

##### API IAM Roles

The following [AWS IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) need to be created and set up. The naming for the staging IAM roles is the same except for `_staging` is appended to the policy name.

[AWS IAM Role Management Console](https://console.aws.amazon.com/iam/home#/roles)


**Infrastructure: Empty Lambda**

name: `bitcoin_api_lambda_infrastructure_emptyLambda`

policies: `AWSLambdaBasicExecutionRole`


**API: POST - /tokens**

name: `bitcoin_api_lambda_api_tokens_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_tokens_post`


**API: GET - /tokens**

name: `bitcoin_api_lambda_api_tokens_get`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_tokens_get`


**API: PUT - /tokens**

name: `bitcoin_api_lambda_api_tokens_put`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_tokens_put`


**API: POST - /addresses**

name: `bitcoin_api_lambda_api_addresses_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_addresses_post`


**API: GET - /fee-data**

name: `bitcoin_api_lambda_api_feeData_get`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_feeData_get`


**Service - Cache On and Off Status**

name: `bitcoin_api_lambda_service_cacheOnAndOffStatus`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_service_cacheOnAndOffStatus`


**API: POST - /withdraws**

name: `bitcoin_api_lambda_api_withdraws_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_api_withdraws_post`


**Exchange API: POST - /exchange-users**

name: `bitcoin_api_lambda_eAPI_eUsers_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_eAPI_eUsers_post`


**Exchange API: GET - /exchange-users/:exchange-user-id**

name: `bitcoin_api_lambda_eAPI_eUsers_eUserId_get`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`, `bitcoin_api_role_lambda_eAPI_eUsers_eUserId_get`


**Exchange API: DELETE - /exchange-users/:exchange-user-id**

name: `bitcoin_api_lambda_eAPI_eUsers_eUserId_delete`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`, `bitcoin_api_role_lambda_eAPI_eUsers_eUserId_delete`


**Exchange API: POST - /verify-user**

name: `bitcoin_api_lambda_eAPI_verifyUser_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_eAPI_login_post`, `bitcoin_api_role_lambda_eAPI_verifyUser_post`


**Exchange API: POST - /login**

name: `bitcoin_api_lambda_eAPI_login_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_eAPI_login_post`


**Exchange API: POST - /withdraws**

name: `bitcoin_api_lambda_eAPI_withdraws_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_eAPI_withdraws_post`, `bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`


**Exchange API: POST - /logout**

name: `bitcoin_api_lambda_eAPI_logout_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`, `bitcoin_api_role_lambda_eAPI_logout_post`


**Exchange API: POST - /exchanges**

name: `bitcoin_api_lambda_eAPI_exchanges_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`


**Exchange API: POST - /dreams**

name: `bitcoin_api_lambda_eAPI_dreams_post`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_eFunction_addTransactionAndUpdateExchangeUser`, `bitcoin_api_eFunction_mongolianBeginningDragonProtection`


**Exchange Service - Handle Exchange Email Delivery Results (EEDRs)**

name: `bitcoin_api_lambda_eService_handleEEDRs`

policies: `AWSLambdaBasicExecutionRole`, `bitcoin_api_role_lambda_eService_handleEEDRs`


##### API IAM Users

To deploy the API, the following [AWS IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) needs to be created and set up. The naming for the staging IAM user is the same except for `_staging` is appended to the user name.

[AWS IAM User Management Console](https://console.aws.amazon.com/iam/home#/users)

**Deploy API User**

user name: `bitcoin_api_deployAPI`

policies: `bitcoin_api_user_deployAPIFunctions`, `bitcoin_api_user_deployExchangeFunctions`


#### Deploy API

To deploy the [AWS Lambda](https://aws.amazon.com/lambda) functions required for the Bitcoin-API API, in the `/infrastructure/scripts/2-api` path in this repo, run the following script:
```
./deployStaging --meta="a"
```
or in production:

```
./deployProduction --meta="a"
```

For reference here are the API deploy command options:

| command name  | meaning | possible values |
|--|--|--|
| functions |  filter functions by nickname, function names separated by commas  | any Lambda function nickname (e.g. `POST/tokens,GET/tokens`) |
| meta | API(a) or exchange(e) | `a`, `e`, or `ae` (deploy all functions, defaults to `ae`)  |

This will set up the Lambda functions associated with the core API part of your Bitcoin-API. Next, the set up for the [AWS API Gateway](https://aws.amazon.com/api-gateway) API used as your core API will be explained in detail. How this works is you create an HTTP API with API Gateway and you attach your deployed Lambda functions to the HTTP API Gateway. After you set up the core API, you will be able to set up the exchange API.

#### API Gateway Set Up 

First go to the [AWS API Gateway Console](https://console.aws.amazon.com/apigateway/main/apis) and press "Create API".

For the "Choose an API type" section, choose "Build" for the "HTTP API" type API.

You will next be prompted to input a name for your API. Input an API name such as `bitcoin_api_core_api_staging` or `bitcoin_api_core_api` and press "Next".

Next, you will be prompted to "Configure routes". Press "Next".

You will then be prompted to "Review and create". Pres "Create".

Next, create six Lambda integrations, and attach them to the appropriate routes:

* `bitcoin_api_api_tokens_post_staging`

* `bitcoin_api_api_tokens_get_staging`

* `bitcoin_api_api_tokens_put_staging`

* `bitcoin_api_api_addresses_post_staging`

* `bitcoin_api_api_feeData_get_staging`

* `bitcoin_api_api_withdraws_post_staging`


**CORS Settings Configuration:**

| Setting |  Value |
|--|--|
| Access-Control-Allow-Origin | * |
| Access-Control-Allow-Headers | * |
| Access-Control-Allow-Methods | * |
| Access-Control-Expose-Headers | * |
| Access-Control-Max-Age | 0 Seconds |

Next, now your core Bitcoin-API API is almost active, only a couple more steps.

First, add the following database entry to the `bitcoin_api_metadata` or the `bitcoin_api_metadata_staging` DynamoDB table:
```.json
{
  "key": "onAndOffSwitch",
  "bitcoinAPIIsOn": true,
  "bitcoinAPIIsOffReason": "This Bitcoin-API instance is off because I'm out having fun with my lover!!!🌹💕💘️💖💏💖💘️💕🌹"
}
```
You can use this database object to control whether the whole API is on or off. Simply set 
`bitcoinAPIIsOn` to `false` to turn the API off.

Now, add the following Lambda function to [run periodically using CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#rules):

* `bitcoin_api_lambda_service_cacheOnAndOffStatus` - every one minute

And now, your Bitcoin-Api core API is active!


#### Deploy The Exchange API

To finish the rest of the set up which includes setting up the exchange, there's a few more steps.

**Set Up Exchange Bitcoin-API Token**

Create a token using the `POST - /tokens` endpoint on your newly created API. The token and the userId associated with this token both need to be added for your API environment variables `EXCHANGE_BITCOIN_API_TESTNET_TOKEN` and `EXCHANGE_TOKEN_USER_ID`. 

Initialize this token by retrieving an address with it. Make a request to the `POST - /addresses` endpoint using your token.

**Deploy Exchange API Lambda Functions**

Deploy your Bitcoin-API exchange API functions with the following command in the `/infrastructure/scripts/2-api` path in this repo:

```
./deployStaging --meta="e"
```
or in production:
```
./deployProduction --meta="e"
```

**Set Up AWS SES**

Set up your [AWS SES](https://aws.amazon.com/ses/) email. SES is used to send emails for setting up exchange accounts.

First, verify the email that you're going to be using to send the exchange emails from, this can be your exchange's support email. You can also verify the entire domain of the email that you're sending from. Verifying your email can be done on [this page in the AWS SES browser console](https://console.aws.amazon.com/ses/home#verified-senders-domain:).

Next, create an [AWS SNS](https://aws.amazon.com/sns) topic to forward email events to an AWS Lambda function. Call this topic `bitcoin_api_e_emailDeliveryResultsForwarder_staging` or `bitcoin_api_e_emailDeliveryResultsForwarder`. On creation, give it a nickname `s_ba_email` or `p_ba_email` (this is optional, you can give it another nickname if you want😃🤠). You can create and configure your SNS topics in the [AWS SNS browser console](https://console.aws.amazon.com/sns/v3/home#/dashboard).

For the SNS topic you've just created, attach your `bitcoin_api_lambda_eService_handleEEDRs_staging` or `bitcoin_api_lambda_eService_handleEEDRs` Lambda function as a subscriber.

Now, back in your [AWS SES browser console](https://console.aws.amazon.com/ses/home), go to your email's or your domain's settings.  In the settings, go to the notifications section and click "Edit configuration". In the "SNS Topic Configuration" settings, for `Bounces`, `Complaints`, and `Deliveries` choose `bitcoin_api_e_emailDeliveryResultsForwarder_staging` or `bitcoin_api_e_emailDeliveryResultsForwarder`. Leave the "Include original headers" checkbox unchecked. Press "Save Config" after.

In your API's .env file, your `EXCHANGE_MANAGEMENT_EMAIL` environment variable must be set to your verified SES's email used to send emails for your exchange.

**Set Up API Gateway HTTP API**

For the Bitcoin-API exchange API, just repeat creating an HTTP API in the same way you created the [core HTTP API](#api-gateway-set-up) except using the exchange Lambda functions. You can name it `bitcoin_api_exchange_api_staging` or `bitcoin_api_exchange_api`.

#### Deploy API Demo Video

Here is an example video of a live production API deployment. Updated website contents are retrieved using a newly deployed [AWS Lambda](https://aws.amazon.com/lambda) function:

<a href="https://www.youtube.com/watch?v=8FCWWAyXB8A">
    <img
        src="https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png"
        width="85"
    />
</a>


### How to Deploy Frontend

The frontend code modules are [React](https://reactjs.org) webapps made with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). They can be deployed in the same way as any other React webapp. The deployment tool currently used for the webapp in the [exchange and game platform video demo](https://youtu.be/EMAwIrHM2Qc) is [AWS Amplify](https://aws.amazon.com/amplify) using its monorepo functionality.

---

### Contributing

Bitcoin-API-Full-Stack is open source. Pull requests, GitHub issues, or any other feedback or suggestions are welcome and are greatly appreciated.
