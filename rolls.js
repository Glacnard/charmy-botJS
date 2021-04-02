module.exports = {
    name: 'diceRoll',
    description: 'rolls the dice for the user',
    execute() {
        let roll = Math.floor(Math.random() * 20) +1;
        return(roll);
    }  
};