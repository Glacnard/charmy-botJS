module.exports = {
    name: 'reload',
    description: "Reloads commands",
    aliases: ['update'],
    execute(message, args) {
        if (!args.length) return message.channel.send(`You didn't pass any command to reload!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) ||
            message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command called ${commandName}`);
        }

        delete require.cache[require.resolve(`./${commandName}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command ${command.name} was successfully reloaded!`);

        } catch (err) {
            console.error(err);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${err.message}\``);
        }
    }
};