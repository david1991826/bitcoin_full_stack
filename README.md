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

Briefly put: The NodeJS services interact with the Bitcoin node which in turn interacts with the Bitcoin blockchain. The NodeJS services gather data from the Bitcoin blockchain. The NodeJS services then perform the required actions on the Bitcoin-Api database. For example the fee data worker gets an estimate for the fee from the Bitcoin blockchain and updates the Bitcoin-Api database with that fee. That fee estimate can then be fetched publicly using the `https://bitcoin-api.io/v3/fee-data` endpoint.

### How to Set Up the Backend


#### Requirements:

1. Have a Mac or Linux server, this can be a computer in your home, or in the cloud (e.g. an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html))

2. Have access to that server. This means you should be able to access a command-line or terminal in that server using [ssh](https://en.wikipedia.org/wiki/Secure_Shell). You can also manually install the backend on a computer locally without ssh, that computer just needs to stay running and connected to the internet for the services to remain active.

3. Have a Redis server that you can access using a URL. [Redis Labs](https://redislabs.com) provides great Redis services.


### Set Up The Bitcoin Node Server(s)

The backend node server is responsible for updating the database. The backend node server has three main functions:

1. Update the fee data

2. Update the bitcoin deposit data, this includes user balance data

3. Perform bitcoin withdraws


>Note about multiple servers:
You can set up multiple backend servers if you have lots and lots of addresses although you only need one, even if you have a few hundred thousand addresses.


#### Steps to Setup a Bitcoin-Api Bitcoin Node Server

This section assumes you have the requirements listed above.


#### 1) Install and start Bitcoin node

**About**

Install and start [Bitcoin-Core](https://bitcoin.org/en/bitcoin-core) on the server. Note that this can take a while because the livenet blockchain takes a decent amount of time to transfer to your server through the internet because of its size which is currently over 250GB. The testnet blockchain downloads much faster because it's currently only around 25GB.


**Steps**

a) First, in the CLI of your Linux server, download the most recent Bitcoin node code with the following command:
```
wget https://bitcoin.org/bin/bitcoin-core-0.20.0/bitcoin-0.20.0-x86_64-linux-gnu.tar.gz
```
(you can check the [Official Bitcoin Core Download Page](https://bitcoin.org/en/download) to make sure this is the most recent Linux download link)

b) Extract the computer-usable code from the downloaded Bitcoin node code:

```
tar xzf bitcoin-0.20.0-x86_64-linux-gnu.tar.gz
```

... TODO: next steps

----

TODO: 

2. Install and start [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon) using all the default configurations

3. Install NodeJs and NPM, this can be done using [Homebrew](https://brew.sh)

4. Install [pm2](https://www.npmjs.com/package/pm2) globally using the following CLI command `npm install pm2 -g`

5. Set up the appropriate files and folders using the following CLI commands:

```
touch currentWithdrawReports.txt
mkdir tigerScript
mkdir treeDeploy
```

6. Run script to transfer tree deployment code

7. --- TODO:🚧👷‍♂️👷‍♀️🏗

---

### How to Deploy Backend

Here is an example video of a live staging deployment for the backend. This video shows the fee update worker being updated using the Giraffe Lick Leaf deployment tool. This deployment provides continuous integration for the backend NodeJS services that interact with the Bitcoin node on the Linux server, the service doesn't need to be shut down or be interrupted:

[![Instant Backend Deployment](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png)](https://www.youtube.com/watch?v=ZZ4zdq4AJY8)



### How to Deploy API

Here is an example video of a live production API deployment. The website contents for [Bitcoin-Api.io](https://bitcoin-api.io) are fetched using an [AWS Lambda](https://aws.amazon.com/lambda) function:

[![🐑🐑Lamb Lamb Deployment](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/youtube-logo-2.png)](https://youtu.be/8FCWWAyXB8A)


### How to Deploy Frontend

The frontend code modules are [React](https://reactjs.org) webapps made with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). They can be deployed in the same way as any other React webapp. The deployment tool currently used for [atExchange.io](https://atexchange.io) and [ProbablyCrypto.com](https://probablycrypto.com) is [AWS Amplify](https://aws.amazon.com/amplify) using the monorepo functionality.


Notes:
* This repo itself is a work in progress with the aim of generalizing, speeding up, and simplifying setting up Bitcoin-Api instances (which includes the API, exchange, and casino).
* PRs and collaborative efforts welcome.👏

Sponsor this page and get priority support and other awesome benefits😁: [Bitcoin-Api GitHub Sponsor Page](https://github.com/sponsors/bitcoin-api)

