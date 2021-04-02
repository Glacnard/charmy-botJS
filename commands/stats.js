const MongoClient = require('mongodb').MongoClient;
const botInfo = require('../bot-info.json');
const url = botInfo.database.url;
const dbName = botInfo.database.name;
const dndRolls = botInfo.database.collection;
const Discord = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'List user stats',
    aliases: ['skils'],
    execute(message, args) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db(dbName);
                try {
                    dbo.collection(dndRolls).findOne({
                        'discordID': message.author.id,
                        'isActive': true
                    }, function (err, result) {
                        let statListMajor = [{
                                "name": "Strength",
                                "stat": result.strength.stat,
                                "mod": result.strength.mod
                            },
                            {
                                "name": "Dexterity",
                                "stat": result.dexterity.stat,
                                "mod": result.dexterity.mod
                            },
                            {
                                "name": "Constitution",
                                "stat": result.constitution.stat,
                                "mod": result.constitution.mod
                            },
                            {
                                "name": "Intelligence",
                                "stat": result.intelligence.stat,
                                "mod": result.intelligence.mod
                            },
                            {
                                "name": "Wisdom",
                                "stat": result.wisdom.stat,
                                "mod": result.wisdom.mod
                            },
                            {
                                "name": "Charisma",
                                "stat": result.charisma.stat,
                                "mod": result.charisma.mod
                            }
                        ];
                        let statListMinor = [{
                                "name": "Acrobatics",
                                "stat": result.acrobatics
                            },
                            {
                                "name": "Animal Handling",
                                "stat": result["animal handling"]
                            },
                            {
                                "name": "Arcana",
                                "stat": result.arcana
                            },
                            {
                                "name": "Athletics",
                                "stat": result.athletics
                            },
                            {
                                "name": "Deception",
                                "stat": result.deception
                            },
                            {
                                "name": "History",
                                "stat": result.history
                            },
                            {
                                "name": "Insight",
                                "stat": result.insight
                            },
                            {
                                "name": "Intimidation",
                                "stat": result.intimidation
                            },
                            {
                                "name": "Investigation",
                                "stat": result.investigation
                            },
                            {
                                "name": "Medicine",
                                "stat": result.medicine
                            },
                            {
                                "name": "Nature",
                                "stat": result.nature
                            },
                            {
                                "name": "Perception",
                                "stat": result.perception
                            },
                            {
                                "name": "Performance",
                                "stat": result.performance
                            },
                            {
                                "name": "Persuasion",
                                "stat": result.persuasion
                            },
                            {
                                "name": "Religion",
                                "stat": result.religion
                            },
                            {
                                "name": "Sleight of hand (SOH)",
                                "stat": result['sleight of hand']
                            },
                            {
                                "name": "Stealth",
                                "stat": result.stealth
                            },
                            {
                                "name": "Survival",
                                "stat": result.survivial
                            }
                        ];
                        let statResultMajor = "";
                        let statResultMajorName = "";
                        let statResultMajorMod = "";
                        let statResultMinorName = "";
                        let statResultMinorStat = "";
                        statListMajor.forEach(stat => {
                            statResultMajor += `${stat.name}\n`;
                            statResultMajorName += `${stat.stat}\n`;
                            statResultMajorMod += `${stat.mod}\n`;
                        });
                        statListMinor.forEach(element => {
                            statResultMinorName += `${element.name}\n`;
                            statResultMinorStat += `${element.stat}\n`;
                        });

                        var resultString = new Discord.MessageEmbed().setTitle(`Name: ${result.name}`).addFields({
                            name: 'Major Stats Name:',
                            value: statResultMajor,
                            inline: true
                        }, {
                            name: 'Major Stats:',
                            value: statResultMajorName,
                            inline: true
                        }, {
                            name: 'Major Modifiers:',
                            value: statResultMajorMod,
                            inline: true
                        }, {
                            name: "Minor Stats",
                            value: statResultMinorName,
                            inline: true
                        }, {
                            name: "Minor Stats Value",
                            value: statResultMinorStat,
                            inline: true
                        });
                        message.channel.send(resultString);
                    });
                    db.close();
                } catch (err) {
                    console.error(err);
                    db.close();
                }
            });
        } catch (error) {
            console.error(error);
            db.close();
        }
    }
};