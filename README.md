# bitcoin-api-full-stack

Complete Code Base for Bitcoin-Api


## Live Demos (with Real Bitcoin!):
* [AtExchange.io](https://atexchange.io) - Bitcoin Exchange
* [ProbablyCrypto.com](https://probablycrypto.com) - Bitcoin Casino


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

![https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture.png](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture.png)

Briefly put: The NodeJS services interact with the Bitcoin node which in turn interacts with the Bitcoin blockchain. Overall, this means the NodeJS services gather data from the Bitcoin blockchain. The NodeJS services then perform the required actions on the Bitcoin-Api database. For example the fee data worker gets an estimate for the fee from the Bitcoin blockchain and updates the Bitcoin-Api database with that fee. That fee estimate can then be retrieved publicly using the `https://bitcoin-api.io/v3/fee-data` endpoint.

### How to Set Up the Backend


#### Requirements:

1. Have a Mac or Linux server, this can be a computer in your home, or in the cloud (e.g. an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)). The Linux server must meet [Bitcoin Core's computer requirements](https://bitcoin.org/en/bitcoin-core/features/requirements).

2. Have access to that server. This means you should be able to access a command-line or terminal in that server using [ssh](https://en.wikipedia.org/wiki/Secure_Shell). You can also manually install the backend on a computer locally without ssh, that computer just needs to stay running and connected to the internet for the services to remain active.

3. Have a Redis server that you can access using a URL. [Redis Labs](https://redislabs.com) provides great Redis services.


### Set Up The Bitcoin Node Server(s)

The backend node server is responsible for updating the database. The backend node server has three main functions:

1. Update the fee data

2. Update the bitcoin deposit data, this includes user balance data

3. Perform bitcoin withdraws


> About multiple servers:
You can set up multiple backend servers if you have lots and lots of addresses although you only need one backend server, even if you have a few hundred thousand addresses. (This hasn't been tested yet, although this is according to what [Andreas Antonopoulos](https://aantonop.com/) said. It's also possible he might have amended what he said because of changes in the technology since when he made the initial claim, in 2019)


#### Steps to Setup a Bitcoin-Api Bitcoin Node Server

This section assumes you have the requirements listed above.


#### 1) Install and start Bitcoin node

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

Start your bitcoin in staging node (testnet):
```
bitcoind -testnet -daemon
```

OR

Start your bitcoin in production node (livenet):
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

* [Page with the Testnet Total Block Height](https://www.blockchain.com/btc-testnet/blocks)

* [Page with the Livenet Total Block Height](https://www.blockchain.com/btc/blocks)

> Warning: if the getblockcount command stops working, it could mean your Bitcoin node crashed due to insufficient memory on your Linux computer.

When your node has finished downloading and is up to date with the Bitcoin blockchain, the number returned from getblockcount is equal to the actual blockchain block height. In the meantime, you can move on to the next steps.

For reference, here's a list of commands you can use on your bitcoin node: [Chain Query list of commands for bitcoin-cli](https://chainquery.com/bitcoin-cli).

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

#### 3) Install MongoDB

**About**

MongoDB is used for caching on your Bitcoin-Api Bitcoin node server. It prevents unnecessary database writes when updating addresses and balances.

These instructions will go through setting up MongoDB on an Amazon Linux server. If your machine is not an Amazon Linux, you can find the appropriate instructions here in the [official MongoDB Linux installation instructions](https://docs.mongodb.com/manual/administration/install-on-linux/).

**Steps**

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


Install MongoDB with this CLI command:
```
sudo yum install -y mongodb-org
```

Start the `mongod` base process:
```
sudo systemctl start mongod
```

You can optionally verify that the `mongod` base processes has started successfully with: 
```
sudo systemctl status mongod
```


#### 4) Deploy Backend

**About**

This section goes through how to deploy the Bitcoin-Api Bitcoin node backend NodeJS modules.

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
Or in production:
```
mkdir treeDeploy/productionCredentials
```

**b)** Transfer Tree Deploy🌲🌳 Code

TODO: 🚧👷‍♂️👷‍♀️🏗 --- in the meantime, see `/1-backend/giraffeDeploy/plantTree.template.sh`

----

TODO: 

5. Run Giraffe Lick Leaf deploy script

--

7. Deploy API

8. --- TODO:🚧👷‍♂️👷‍♀️🏗

---

### How to Deploy Backend

Here is an example video of a live staging deployment for the backend. This video shows the fee update worker being updated using the Giraffe Lick Leaf deployment tool. This deployment provides continuous integration for the backend NodeJS services that interact with the Bitcoin node on the Linux server, the service doesn't need to be shut down or be interrupted:

[![Instant Backend Deployment](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png)](https://www.youtube.com/watch?v=ZZ4zdq4AJY8)



### How to Deploy API

Here is an example video of a live production API deployment. The website contents for [Bitcoin-Api.io](https://bitcoin-api.io) are retrieved using an [AWS Lambda](https://aws.amazon.com/lambda) function:

[![🐑🐑Lamb Lamb Deployment](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png)](https://youtu.be/8FCWWAyXB8A)


### How to Deploy Frontend

The frontend code modules are [React](https://reactjs.org) webapps made with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). They can be deployed in the same way as any other React webapp. The deployment tool currently used for [atExchange.io](https://atexchange.io) and [ProbablyCrypto.com](https://probablycrypto.com) is [AWS Amplify](https://aws.amazon.com/amplify) using the monorepo functionality.


Notes:
* This repo itself is a work in progress with the aim of generalizing, speeding up, and simplifying setting up Bitcoin-Api instances (which includes the API, exchange, and casino).
* PRs and collaborative efforts welcome.👏

Sponsor this page and get priority support and other awesome benefits😁: [Bitcoin-Api GitHub Sponsor Page](https://github.com/sponsors/bitcoin-api)

