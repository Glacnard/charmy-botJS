const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;


module.exports = {

    name: 'delete',
    description: 'switch a character',
    aliases: ['remove'],
    execute(message, args) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                //message.channel.send("Work in progress");
                //return;
                let dbo = db.db(dbName);
                let authorId = message.author.id;
                let name = args[0];
                dbo.collection(dndRolls).deleteOne({
                    "name": name,
                    "discordID": authorId
                }, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        message.channel.send(`${name} has been removed!`);
                        db.close();
                        return;
                    } else {
                        message.channel.send("None of your characters have that name.");
                        db.close();
                    }

                });
            });
        } catch (error) {
            console.error(error);
            db.close();
        };
    }
};