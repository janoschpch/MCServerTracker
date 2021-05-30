const RequestHandler = require('./utils/RequestHandler.js');

const servers = new Map([
    ['hypixel.net', 'casual'],
    ['gommehd.net', 'sweater'],
    ['bedwarspractice.club', 'casual']
]);

function requestServers() {
    servers.forEach(function(value, key, map) {
        RequestHandler.getData(key, function(data) {
            console.log(value + ' ' + key + ' online players: ' + data.players.online);
        });
    })
}

requestServers();