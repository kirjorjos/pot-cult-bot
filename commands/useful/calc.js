const Calculator = require("@mroutput/jscalc");
var c = new Calculator();

module.exports = {
    name: "calc",
    category: "useful",
    description: "Calculates math equations",
    usage: "calc <expression>",
    run: async (bot, message, args) => {
         result = c.exec(args.join(""));
         message.channel.send(result);
    }
}