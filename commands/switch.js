const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;


module.exports = {

    name: 'switch',
    description: 'switch a character',
    aliases: ['swap', 'change'],
    execute(message, args) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                //message.channel.send("Work in progress");
                //return;
                let dbo = db.db(dbName);
                let authorId = message.author.id;
                let name = args[0];
                dbo.collection(dndRolls).find({"discordID":authorId}, async function(err, result){
                    await result.forEach(element => {
                        if(element.isActive){
                            dbo.collection(dndRolls).updateOne({"name":element.name},{$set: {isActive: false}});
                        }
                    });
                    //console.log(result);
                    dbo.collection(dndRolls).updateOne({"name": name}, {$set: {isActive: true}},function(err, result){
                        db.close();
                    });
                    message.channel.send(`Character has been changed to ${name}!`);
                });
               //db.close();
            });
        } catch (error) {
            console.error(error);
            db.close();
        };
    }
};