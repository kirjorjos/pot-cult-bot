const Calculator = require("@mroutput/jscalc");
var c = new Calculator();

module.exports.run = async (bot, message, args, prefix) => {
   result = c.exec(args.join(""));
   message.channel.send(result);
}

module.exports.help = {
  name: "calc"
}