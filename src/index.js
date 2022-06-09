const RequestHandler = require('./utils/RequestHandler.js');
const mysql = require('mysql');
const schedule = require('node-schedule');

var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE'
});

// List with servers to ping, the code was private for a long time, so there are no big configuration options
const servers = new Map([
    ['hypixel.net', 'casual'],
    ['gommehd.net', 'sweater'],
    ['bedwarspractice.club', 'casual'],
    ['antiac.net', 'sweater'],
    ['cytooxien.de', '1-16'],
    ['mineplex.eu', 'casual'],
    ['spieleoase.net', 'sweater'],
    ['timolia.de', 'sweater'],
    ['hglabor.de', '1-16'],
    ['neruxvace.net', 'sweater'],
    ['minesucht.net', 'sweater']
]);

mysqlConnection.connect();

function requestServers() {
    console.log('-------[NEW PING]-------')

    var date = new Date();

    var date_only = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var time = date.getHours() + ":" + date.getMinutes();

    servers.forEach(function(value, key, map) {
        RequestHandler.getData(key, function(data) {
            // I know, you shouldn't do that
            var sql = "INSERT INTO serverstats (date, date_only, time_only, address, type, version, protocolversion, playercount, maxplayercount, favicon, ping) VALUES ('" + date_only + " " + time + "', '" + date_only + "', '" + time + "', '" + key + "', '" + value + "', '" + data.version.name + "', " + data.version.protocol + ", " + data.players.online + ", " + data.players.max + ", '" + "disabled" + "', " + data.ping + ")";
            console.log(date_only + ' | ' + time + ' | ' + 'Adding entry to db: ' + key + ' / ' + data.players.online + ' / ' + data.players.max + ' / ' + data.ping + 'ms');
            mysqlConnection.query(sql, function(err, result) {
                if(err) {
                    console.log('An error occured whilst inserting ' + key + ' stats into db: ' + err);
                }
            });
        });
    })
}

setInterval(() => {
    requestServers();
}, 60000)
