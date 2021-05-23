'use strict';

exports.recaptcha_priv_key = 'YOUR_GOOGLE_RECAPTCHA_PRIVATE_KEY';
exports.password_private_suffix = 'LONG_RANDOM_STRING1';
exports.SSL_KEY = '../ssl_certificates/privkey.pem'; //change to your ssl certificates private key
exports.SSL_CERT = '../ssl_certificates/fullchain.pem'; //change to your ssl certificates fullchain

exports.walletspassphrase = {
    'MC' : 'LONG_RANDOM_STRING2',
    'BTC' : 'LONG_RANDOM_STRING3',
    'LTC' : 'LONG_RANDOM_STRING4',
    'DOGE' : 'LONG_RANDOM_STRING5',
    'DASH' : 'LONG_RANDOM_STRING6',
    'NENG' : 'LONG_RANDOM_STRING7',
    'CHTA' : 'LONG_RANDOM_STRING8'
};
