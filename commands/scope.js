module.exports = {
    name: 'scope',
    description: 'gives an accurate depection of project scope',
    execute(message, args) {
        if(!args[0] === ""|| !isNaN(args[0])){
            message.channel.send(`***FUCK YOU ${args[0]}***`)
        }
        else{
            message.channel.send('***FUCK YOU***');
        }
    }
};