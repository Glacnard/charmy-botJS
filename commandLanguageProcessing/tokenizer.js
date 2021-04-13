const natural = require('natural');
const Discord = require('discord.js');


module.exports = {
    name:'language',
    description:'Uses Language to determine what is said',
    execute(message, content) {
        //console.log(message);
        var tokenizer = new natural.WordTokenizer();
        
        let wordList = tokenizer.tokenize(content);
        wordList.shift();
        
        var stemmer = natural.PorterStemmer;
        var Analyzer = natural.SentimentAnalyzer;

        let analyzer = new Analyzer('English', stemmer, 'afinn');
        let result = analyzer.getSentiment(wordList);
        console.log(result);
        var resultString = "";
        //console.log(result);
        if(result > .25) {
            resultString = "Postitive Response";
        } else {
            resultString = "Negative Response";
        }
        //console.log(analyzer.getSentiment(args));
        //console.log(analyzer.getSentiment(["Hello", "There", "Chum"]));
        message.channel.send(resultString);

    }
};