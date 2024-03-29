const Discord = require('discord.js');
//const Canvas = require('canvas');
const fs = require('fs');
const botInfo = require('./bot-info.json');
const prefix = botInfo.prefix;
const languageProcessing = require('./commandLanguageProcessing/tokenizer');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Charmbot Ready");
});

client.on('message', message => {
    if(message.content.startsWith("{Bot ID}")) {
        languageProcessing.execute(message, message.content);
    }
    else if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

	const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command){
        return;
    }

    if(command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguements!`);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    
});

client.login(botInfo.token);