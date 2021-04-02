const fs = require('fs');
const Discord = require('discord.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


module.exports = {
    name: 'commands',
    description: 'List commands',
    aliases: ['help'],
    execute(message, args) {

        var resultString = new Discord.MessageEmbed().addFields(
            {name: 'Commands', value: commandFiles}
        );
        message.channel.send(resultString);
        //message.channel.send(commandFiles);
    }
};