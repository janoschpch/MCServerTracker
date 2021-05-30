const MinecraftPinger = require('minecraft-pinger');

function getData(adress, callback) {
    MinecraftPinger.ping(adress, 25565, (error, result) => {
        if(error) {
            console.log('An error occured whilst pinging ' + adress + ': ' + error);
            return;
        }
        callback(result);
    });
}

exports.getData = getData;