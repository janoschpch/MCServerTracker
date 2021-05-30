const RequestHandler = require('./utils/RequestHandler.js');
const mysql = require('mysql');
const schedule = require('node-schedule');

var mysqlConnection = mysql.createConnection({
    host: '192.168.178.130',
    user: 'root',
    password: 'raspberry',
    database: 'mctracker'
});

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
            var sql = "INSERT INTO serverstats (date, date_only, time_only, address, type, version, protocolversion, playercount, maxplayercount, favicon, ping) VALUES ('" + date_only + " " + time + "', '" + date_only + "', '" + time + "', '" + key + "', '" + value + "', '" + data.version.name + "', " + data.version.protocol + ", " + data.players.online + ", " + data.players.max + ", '" + data.favicon + "', " + data.ping + ")";
            console.log(date_only + ' | ' + time + ' | ' + 'Adding entry to db: ' + key + ' / ' + data.players.online + ' / ' + data.players.max + ' / ' + data.ping + 'ms');
            mysqlConnection.query(sql, function(err, result) {
                if(err) {
                    console.log('An error occured whilst inserting ' + key + ' stats into db: ' + err);
                }
            });
        });
    })
}

var task1 = schedule.scheduleJob('0 0 * * * *', function() {
    requestServers();
});

var task2 = schedule.scheduleJob('0 5 * * * *', function() {
    requestServers();
});

var task3 = schedule.scheduleJob('0 10 * * * *', function() {
    requestServers();
});

var task4 = schedule.scheduleJob('0 15 * * * *', function() {
    requestServers();
});

var task5 = schedule.scheduleJob('0 20 * * * *', function() {
    requestServers();
});

var task6 = schedule.scheduleJob('0 25 * * * *', function() {
    requestServers();
});


var task7 = schedule.scheduleJob('0 30 * * * *', function() {
    requestServers();
});


var task8 = schedule.scheduleJob('0 35 * * * *', function() {
    requestServers();
});

var task9 = schedule.scheduleJob('0 40 * * * *', function() {
    requestServers();
});

var task10 = schedule.scheduleJob('0 45 * * * *', function() {
    requestServers();
});

var task11 = schedule.scheduleJob('0 50 * * * *', function() {
    requestServers();
});

var task12 = schedule.scheduleJob('0 55 * * * *', function() {
    requestServers();
});