const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const Discord = require('discord.js');


module.exports = {
    name: 'decrease',
    description: 'decrease a stat',
    aliases: ['down'],
    execute(message, args) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                //message.channel.send("Work in progress");
                //return;
                let dbo = db.db(dbName);
                let majorStatsList = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
                let authorId = message.author.id;
                var statValue = args[0];
                dbo.collection(dndRolls).findOne({
                    'discordID': authorId,
                    'isActive':true
                }, async function (err, result) {
                    if (majorStatsList.includes(statValue)) {
                        let currentStat = result[statValue].stat;
                        let myQuery = {discordID: authorId, isActive:true};
                        let changeAmount = parseInt(args[1]);
                        let newValue = currentStat - changeAmount;
                        let newMod = Math.floor((newValue - 10) / 2);
                        let setChange = {};
                        let changeValue = await {
                            "stat": newValue,
                            "mod": newMod
                        };

                        setChange[statValue] = changeValue;

                        let value = {
                            $set: setChange
                        };
                        dbo.collection(dndRolls).updateOne(myQuery,value, async function(err, result) {
                            if(err) throw err;
                            db.close();
                        });
                        message.channel.send(`${statValue} has been decreased from ${currentStat} to ${newValue} with a modifier of ${newMod}`);
                    } else {
                        let currentStat = result[statValue];
                        let changeAmount = parseInt(args[1]);
                        let newValue = currentStat - changeAmount;
                        let myQuery = {discordID: authorId, isActive:true};
                        let setChange = {};
                        setChange[statValue] = newValue;
                        let value = {
                            $set: setChange
                        };
                        dbo.collection(dndRolls).updateOne(myQuery,value, async function(err, result) {
                            if(err) throw err;
                            db.close();
                        });
                        message.channel.send(`${statValue} has been decreased from ${currentStat} to ${newValue}`);
                    };
                });
               //db.close();
            });
        } catch (error) {
            console.error(error);
            db.close();
        };
    }
};