const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const rolls = require('../rolls');

module.exports = {
    name: 'insight',
    description: 'List user stats',
    aliases: ['ins'],
    execute(message, args) {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db(dbName);
                try{
                    dbo.collection(dndRolls).findOne({'discordID': message.author.id, 'isActive': true}, function(err, result) {
                        let roll = rolls.execute();
                        let mod = result.insight;
                        let resultString = `Rolled: ${roll} + ${mod} = ${roll + mod}`;
                        message.channel.send(resultString);
                    });
                    db.close();
                }catch(err) {
                    console.error(err)
                }
            });
        }catch(error) {
            console.error(error);
            db.close();
        }  
    }
};