const MinecraftPinger = require('minecraft-pinger');

function getData(address, callback) {
    MinecraftPinger.ping(address, 25565, (error, result) => {
        if(error) {
            console.log('An error occured whilst pinging ' + address + ': ' + error);
            return;
        }
        callback(result);
    });
}

exports.getData = getData;