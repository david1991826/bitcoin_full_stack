# bitcoin-api-full-stack

Complete Code Base for Bitcoin-Api


## Live Demos (with Real Bitcoin!):
* [AtExchange.io](https://atexchange.io) - Bitcoin Exchange
* [ProbablyCrypto.com](https://probablycrypto.com) - Bitcoin Casino


## Contents
* [About](#about)
* [Bitcoin Node Servers](#bitcoin-node-servers)
* [How to Set Up the Backend](#how-to-set-up-the-backend)

### About

The repo `bitcoin-api-full-stack` is a repo for anybody, even an individual,
to have their own Bitcoin management technology. Instead of needing an
entire group of individuals or a company to manage a Bitcoin wallet app,
exchange or casino, this repo aims to give the user complete individual control over
these powerful financial technologies.

Github Stars⭐️⭐️⭐️⭐️⭐️ are always super-greatly appreciated, thank you very much!😁✌️


### Bitcoin Node Servers

![https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture.png](https://bitcoin-api.s3.amazonaws.com/documents/open-source/bitcoin-api-full-stack/bitcoin-node-server-architecture.png)


### How to Set Up the Backend


#### Requirements:

1. Have a Mac or Linux server, this can be a computer in your home, or in the cloud (e.g. an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html))

2. Have to access that server. This means you should be able to access a command-line or terminal in that server using [ssh](https://en.wikipedia.org/wiki/Secure_Shell).


### Set Up The Bitcoin Node Server(s)

The backend node server is responsible for updating the database. The backend node server has three main functions:

1. Update the fee data

2. Update the bitcoin deposit data, this includes user balance data

3. Perform bitcoin withdraws


>Note about multiple servers:
You can set up multiple backend servers if you have lots and lots of addresses although you only need one, even if you have a few hundred thousand addresses.


#### Steps to Setup A Bitcoin-Api Bitcoin Node Server

This section assumes you have access to the server and can perform command-line operations in it.

1. Install and start [Bitcoin-Core](https://bitcoin.org/en/bitcoin-core) on the server. Note that this can take a while because the blockchain takes a decent amount of time to transfer to your server through the internet because of its size (currently over 250GB).

2. Install and start [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon) using all the default configurations

3. Install NodeJs and NPM, this can be done using [Homebrew](https://brew.sh)

4. Install [pm2](https://www.npmjs.com/package/pm2) globally `npm install pm2 -g`

5. Set up the appropriate directories with the following commands:

```
touch currentWithdrawReports.txt
mkdir tigerScript
mkdir treeDeploy
```

6. Run script to transfer tree deployment code

7. --- TODO:🚧👷‍♂️👷‍♀️🏗

---

Notes:
* The deployments are lightning fast once set up.
* This is a work in progress, PRs and collaborative efforts welcome.👏

Sponsor this page and get priority support and other awesome benefits😁: [Bitcoin-Api GitHub Sponsor Page](https://github.com/sponsors/bitcoin-api)

