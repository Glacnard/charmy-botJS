const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const Discord = require('discord.js');
const fs = require('fs');
const https = require('https');

module.exports = {
    name: 'location',
    description: 'handles locations',
    aliases: ["world"],
    execute(message, args) {
        switch(args[0]){
            case "load":
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
                        await dbo.collection(dndRolls).find({}, async function(err, result) {
                            await result.forEach(element => {
                                if(element.isActive){
                                    dbo.collection(dndRolls).updateMany({},{$set: {isActive : false}});
                                }
                            });
                        let myLocation = await dbo.collection(dndRolls).findOne({locationName: locationName}, async function(err, result) { 
                            path += result.locationPath;
                        });
                        let myQuery = {locationName: locationName};
                        let newValues = {$set: {isActive: true}};                     
                        dbo.collection(dndRolls).updateOne(myQuery, newValues, async function(err, result){
                                await message.channel.send(`${locationName} has been loaded!`, {
                                    files: [
                                        path
                                    ]
                                });
                                db.close();
                            });
                        });
                    });
                }catch(error) {
                    console.error(error);
                    message.channel.send("error loading location");
                    db.close();
                }
                break;
            case "gridify":
                if(!message.author.id === 146769054340874241 || !message.author.id === 276579644915056641){
                    message.channel.send("You don't have permissions to use this command");
                    return;
                }
                break;
            case "upload":
                if(!message.author.id === 146769054340874241 || !message.author.id === 276579644915056641){
                    message.channel.send("You don't have permissions to use this command");
                    return;
                }
                message.channel.send("You made it this far, not bad kid");
                
                let attachment = message.attachments.first();
                //fs.createReadStream(attachment.url).pipe();
                let writeFile = fs.createWriteStream(`./images/locations/${attachment.name}`);
                https.get(attachment.url, (response) => {
                    response.pipe(writeFile);
                });
                message.channel.send("File uploaded!");
                try{
                    MongoClient.connect(url, async function(err, db) {
                        if (err) throw err;
                        let dbo = db.db(dbName);
                        let myInsert = {locationName: attachment.name, locationVersion: 0,  isActive: false, locationPath: `./images/locations/${attachment.name}`};
                        dbo.collection(dndRolls).insertOne(myInsert, function(err, response) {
                            //console.error(err);
                            db.close();
                        });
                    });
                }catch(error) {
                    console.error(error);
                    message.channel.send("error loading location");
                    db.close();
                }      
                break;
            case "list":
                try{
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        let dbo = db.db(dbName);
                        characterList = [];
                        dbo.collection(dndRolls).find({}, async function(err, result) {
                            await result.forEach(element => {
                                characterList.push({"locationName": element.locationName,"isActive": element.isActive});
                            });
                            db.close();
                            let characters = "";
                            let isActive = "";
                            characterList.forEach(name => {
                                characters += `${name.locationName}\n`;
                                isActive += `${name.isActive}\n`;
                            });
                            var resultString = new Discord.MessageEmbed().setTitle("List of Characters").setDescription("Lists of locations in this campaign")
                            .addFields(
                            {name: `Location:`, value: characters, inline: true},
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
                break;
            default:
                message.channel.send("No such arguments for location command");
        }

    }
};