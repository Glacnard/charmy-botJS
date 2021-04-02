const Discord = require('discord.js');
module.exports = {
    name: 'roll',
    description: 'rolls the dice for the user',
    execute(message, args) {
        let numOfDice = parseInt(args[0]);
        let dice = args[1];
        let rolls = [];
        let modifier = 0;
        let total = 0;
        /*
        if(message.author.id === "157309180728967168"){
            message.channel.send("FUCK YOU JOSH!!");
            return;
        }
        */
        //console.log(args[2]);
        if(!args[2] === "" || !isNaN(args[2])){
            modifier = parseInt(args[2]);
        }
        //console.log(modifier);
        for(x = 0; x < numOfDice; x++) {
            rolls.push(Math.floor(Math.random() * dice) + 1);
        }
        rolls.forEach(element => {
            total += element;
        })
        total += modifier;
        let resultString = new Discord.MessageEmbed().setTitle(`${message.author.username} Rolls:`).addFields(
            {name: 'Rolls:', value: rolls, inline:true },
            {name: 'Modifier', value: modifier, inline: true},
            {name: 'Total:', value: total, inline:true }
        );
        //let roll = Math.floor(Math.random() * dice) + 1;
        message.channel.send(resultString);
    }  
};