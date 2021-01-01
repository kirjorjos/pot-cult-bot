const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

module.exports = {
	name: 'eval',
	description: 'Ping!',
	execute(message, args, authorID, owner) {
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
	},
};