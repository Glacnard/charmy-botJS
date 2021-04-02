const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const Discord = require('discord.js');
const fs = require('fs');
const https = require('https');

module.exports = {
    name: 'post',
    description: 'handles locations',
    aliases: ["image"],
    execute(message, args) {
        return;
        if(!message.author.id === 146769054340874241 || !message.author.id === 276579644915056641){
            message.channel.send("You don't have permissions to use this command");
            return;
        }
        try{
            MongoClient.connect(url, async function(err, db) {
                if (err) throw err;
                let dbo = db.db(dbName);
                let locationName = args[1];
                let path = "";
                let myLocation = await dbo.collection(dndRolls).findOne({locationName: locationName}, async function(err, result) { 
                    path += result.locationPath;
                });
                await message.channel.send(``, {
                    files: [
                        path
                    ]
                });
            });
            db.close();
        }catch(error) {
            console.error(error);
            //message.channel.send("error posting image");
            db.close();
        }

    }
};