'use strict';

const utils = require("../../utils.js");
const g_constants = require("../../constants.js");
const WebSocket = require('ws');
const mailer = require("../mailer");
const database = require("../../database");
const wallet = require("./wallet")
const orders = require("./orders");


exports.Init = function()
{
    mailer.SendStartAppNotification(ret => {
        console.log(ret.message);
    })
    setInterval(exports.UpdateMarket, 10000);
};


exports.BTC_History24 = function(ticker, callback)
{
    const MC = g_constants.share.TRADE_MAIN_COIN_TICKER;
    let market = MC + '-' + ticker ;
    const uri = 'https://'+g_constants.DOMAIN+'/api/v1/public/getmarketsummary?market='+market+'&period=24';
    const parsed = require('url').parse(uri, true);
    
    const options = {
        host: parsed.host,
        path: parsed.path,
    };
    
    require("https").request(options, res => {
        let output = '';
        res.on('data', chunk => { output += chunk; });
        res.on('end', () => { return callback(JSON.parse(output)); }); }).end();
};


let g_LastMarketData = {};

exports.UpdateMarket = function()
{
    if (!g_constants.WEB_SOCKETS || !g_constants.dbTables['coins']) return;
    
    g_constants.dbTables['coins'].selectAll('ROWID AS id, name, ticker, icon, info', '', 'ORDER BY id', (err, rows) => {
        if (err || !rows || !rows.length)
            return;
        
        let data = [];    
        for (var i=0; i<rows.length; i++)
        {
            try { rows[i].info = JSON.parse(utils.Decrypt(rows[i].info));}
            catch(e) {continue;}

            if (rows[i].info.active != true)
                continue;
            
            rows[i].name = unescape(rows[i].name);    
            require("./trade").GetLastCoinHistory(rows[i]);
                
            data.push(rows[i]);
        }
        const msg = {coins: data};
        g_LastMarketData = msg;
        
        // Broadcast to everyone else.
        const msgString = JSON.stringify({request: 'market', message: msg});
        g_constants.WEB_SOCKETS.clients.forEach( client => {
            if (client.readyState === WebSocket.OPEN) 
                try {client.send(msgString);} catch(e) {client.terminate();}
        });
    });
};

exports.GetMarketData = function(callback) {
    callback(g_LastMarketData);
}

