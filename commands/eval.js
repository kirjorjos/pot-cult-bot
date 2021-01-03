module.exports.run = async (bot, message, args, prefix) => {
  code = args.join(' ');
	  if (owner.includes(authorID)) {
      try {
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    } else {
      message.channel.send('Sorry, but you dont have the perms to do this.')};
}

module.exports.help = {
  name: "eval"
}