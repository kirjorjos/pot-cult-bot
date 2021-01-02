const Calculator = require("@mroutput/jscalc");
var c = new Calculator();

module.exports = {
	name: 'calc',
	description: 'Ping!',
	execute(message, args, authorID, owner) {
    var result;
    console.log(args.join())
    try {
      result = c.exec(args.join(""));
    } catch(e) {
      result = "Faulty expression."
    }
    message.channel.send(result);
	},
};