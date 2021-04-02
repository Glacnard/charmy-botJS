const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;

module.exports = {

    name: 'create',
    description: 'create a character',
    aliases: ['add'],
    execute(message, args) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                //message.channel.send("Work in progress");
                //return;
                let dbo = db.db(dbName);
                let authorId = message.author.id;
                let name = args[0];
                let str = {stat: parseInt(args[1]), mod:Math.floor((args[1] - 10) / 2)};
                let dex =  {stat: parseInt(args[2]), mod:Math.floor((args[2] - 10) / 2)};
                let con =  {stat: parseInt(args[3]), mod:Math.floor((args[3] - 10) / 2)};
                let int =  {stat: parseInt(args[4]), mod:Math.floor((args[4] - 10) / 2)}
                let wis =  {stat: parseInt(args[5]), mod:Math.floor((args[5] - 10) / 2)}
                let char =  {stat: parseInt(args[6]), mod:Math.floor((args[6] - 10) / 2)}
                let acro = parseInt(args[7]);
                let animal = parseInt(args[8]);
                let arcana = parseInt(args[9]);
                let athletics = parseInt(args[10]);
                let deception = parseInt(args[11]);
                let hist = parseInt(args[12]);
                let insight = parseInt(args[13]);
                let intim = parseInt(args[14]);
                let invest = parseInt(args[15]);
                let med = parseInt(args[16]);
                let nature = parseInt(args[17]);
                let percep = parseInt(args[18]);
                let perfor = parseInt(args[19]);
                let persua = parseInt(args[20]);
                let reli = parseInt(args[21]);
                let soh = parseInt(args[22]);
                let stealth = parseInt(args[23]);
                let surv = parseInt(args[24]);
                let active = false;

                dbo.collection(dndRolls).insertOne(
                    {
                        name: name,
                        strength: str,
                        dexterity: dex,
                        constitution: con,
                        intelligence: int,
                        wisdom: wis,
                        charisma: char,
                        acrobatics: acro,
                        'animal handling': animal,
                        arcana: arcana,
                        athletics: athletics,
                        deception: deception,
                        history: hist,
                        insight: insight,
                        intimidation: intim,
                        investigation: invest,
                        medicine: med,
                        nature: nature,
                        perception: percep,
                        performance: perfor,
                        persuasion: persua,
                        religion: reli,
                        'sleight of hand': soh,
                        stealth: stealth,
                        survivial: surv,
                        isActive: active,
                        discordID: authorId,
                        DisplayName: message.member.user.tag
                    });
                    message.channel.send("Character created!");
               db.close();
            });
        } catch (error) {
            console.error(error);
            db.close();
        };
    }
};