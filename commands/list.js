const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const Discord = require('discord.js');

module.exports = {
    name: 'list',
    description: 'List users',
    execute(message, args) {
        try{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db(dbName);
                characterList = [];
                dbo.collection(dndRolls).find({}, async function(err, result) {
                    await result.forEach(element => {
                        characterList.push({"name": element.name, "displayName": element.DisplayName, "isActive": element.isActive});
                    });
                    db.close();
                    let names = "";
                    let characters = "";
                    let isActive = "";
                    characterList.forEach(name => {
                        characters += `${name.name}\n`;
                        names += `${name.displayName}\n`;
                        isActive += `${name.isActive}\n`;
                    });
                    var resultString = new Discord.MessageEmbed().setTitle("List of Characters").setDescription("Lists the characters in this campaign")
                    .addFields({name: `Name:`, value: names, inline: true},
                    {name: `Character:`, value: characters, inline: true},
                    {name:`Active:`, value: isActive, inline: true }
                    );
                    message.channel.send(resultString);                    
                });

                db.close();
            });
        }catch(error) {
            console.error(error);
            db.close();
        }   
    }
};