# OpenTrade behind shorelinecrypto exchange was hacked on 11/11/2021. 
# This software is no longer deemed secure. Please checkout Shorelinecrypto 
# bitcointalk ann page or discord announcement for latest announcement and development on this issue

Live version https://shorelinecrypto.com/

Discord: https://discordapp.com/invite/jZMyhKm

Reddit: https://www.reddit.com/r/shorelinecrypto/

Bitcointalk Ann: https://bitcointalk.org/index.php?topic=5339980.0

ShorelineCrypto version of OpenTrade (SLC version) is fork of original OpenTrade exchange (MC version, part of Marycoin eco-system)  with custom security Enhancement Patches. The key features and differences between the original and this versions are:

(1) Basecoin in trade pairs are changed from Marycoin to Dogecoin.

(2) No fractional reserve based wallet withdraw allowed on admin account. The latest MC version opentrade software introduced coupon feature where admin account coin withdraw can be allowed even if the coins are not in wallet. SLC version forked off before this coupon feature commits so that fractional reserve wallet withdraw is not allowed even on admin account.

(3) Extensive security patches on API code where strict regular expression is enforced to deny SQL injection hack in input variables.

(4) Extensive security patches on profile/registration page where strict regular expression is enforced to deny SQL injection hack in username/emails


## Step-by-step install instructions:

1. Register on the VPS hosting like this  https://www.vultr.com/?ref=8411446
2. Create "SSD Cloud Instances" Ubuntu 18.04  x64 / 1GB / 1vCPU / 25 GB SSD
3. Log in to Droplet console over SSH

```
[sudo] apt-get update
[sudo] apt-get install build-essential libssl-dev curl -y
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
bash install_nvm.sh
[sudo] reboot

nvm install 12.18.4

git clone [shoreline github URL] 
cd opentrade

sudo npm install 

mkdir ~/opentrade/server/database

```

### Special Note
1. sqlite3 module maye need fix
```
 npm uninstall and install --save 
```
2. ejs crash ,  run below:
```
 npm uninstall ejs
 npm install ejs-lint
```

### Setup Your Web Site Domain and SSL Certificate, Google Recaptcha

Purchase your domain and SSL certificate from vendor like Namecheap ( https://www.namecheap.com/ ), 
Setup Google Recaptcha with public/private key to be ready for the exchange launch.


### Here is an example of file ~/opentrade/server/modules/private_constants.js Edit as per your config.

```
'use strict';

exports.recaptcha_priv_key = 'YOUR_GOOGLE_RECAPTCHA_PRIVATE_KEY';
exports.password_private_suffix = 'LONG_RANDOM_STRING1';
exports.SSL_KEY = '../ssl_certificates/privkey.pem'; //change to your ssl certificates private key
exports.SSL_CERT = '../ssl_certificates/fullchain.pem'; //change to your ssl certificates fullchain

exports.walletspassphrase = {
    'MC' : 'LONG_RANDOM_STRING2',
    'BTC' : 'LONG_RANDOM_STRING3',
    'DOGE' : 'LONG_RANDOM_STRING4'
};
```

**After all you can run exchange**

```
cd  ~/opentrade/server
sudo node main.js
```

In the browser address string type https://127.0.0.1:443
You will see OpenTrade.

The first registered user will be exchange administrator. 

# Add trade pairs

For each coin you should create *.conf file
This is common example for "some_coin.conf"

```
rpcuser=long_random_string_one
rpcpassword=long_random_string_two
rpcport=12345
rpcclienttimeout=10
rpcallowip=127.0.0.1
server=1
daemon=1
upnp=0
rpcworkqueue=1000
enableaccounts=1
litemode=1
staking=0
addnode=1.2.3.4
addnode=5.6.7.8

```

Also you must encrypt wallet.dat by the command

```
./bitcoind encryptwallet random_long_string_SAME_AS_IN_FILE_private_constants.js

```

*If coin is not supported encryption (like ZerroCash and it forks) then coin could not be added to the OpenTrade*

### Special Note for Bitcoin and Litecoin

New version of bitcoin/litecoin core wallet removed bitcoin-rpc features that are required on this SLC version of opentrade. For compatibility 
purpose, please run older version bitcoin and litecoin such as below:
 * bitcoin 0.17.1
 * litecoin 0.17.1

Plus add one line in both bitcoin and litecoin conf file to enable bitcoin-rpc feature on v0.17.1
```
deprecatedrpc=accounts
```

When coin daemons will be configured and started

1. Register on exchange. The first registered user will be exchange administrator.
2. Go to "Admin Area" -> "Coins" -> "Add coin"
3. Fill up all fields and click "Confirm"
4. Fill "Minimal confirmations count" and "Minimal balance" and uncheck and check "Coin visible" button
5. Click "Save"
6. Check RPC command for the coin. If it worked then coin was added to the exchange!

All visible coins should be appear in the Wallet. You shoud create default coin pairs now.

File ~/opentrade/server/constants.js have constant that you can change

https://github.com/ShorelineCrypto/opentrade/blob/master/server/constants.js#L19

```
exports.TRADE_MAIN_COIN = "Dogecoin"; //change Dogecoin to your main coin pair 
exports.TRADE_DEFAULT_PAIR = "Nengcoin"; //change Nengcoin to your default coin pair 
exports.TRADE_COMISSION = 0.002; //change trade comission percent

exports.recaptcha_pub_key = "6LeX5SQUAAAAAKTieM68Sz4MECO6kJXsSR7_sGP1"; //change to your recaptcha public key

exports.NOREPLY_EMAIL = 'no-reply@multicoins.org'; //change no-reply email 
exports.SUPPORT_EMAIL = 'ivanivanovkzv@gmail.com'; //change to your valid email for support requests 
exports.my_portSSL = 443; //change to your ssl port

```

After that you coins should appear on the main page.


