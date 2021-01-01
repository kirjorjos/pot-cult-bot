const keep_alive = require('./keep_alive.js')
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const owner = process.env.OWNER
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { exec } = require("child_process");
const allCommands = fs.readdirSync('./commands');
var messagesSent = 0;
const Calculator = require("@mroutput/jscalc");
  const c = new Calculator();
function download(url, path){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(path));
}


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', message => {
  messagesSent = messagesSent + 1;
  if (!message.content.startsWith(prefix) || message.author.bot)  return;

  


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  const authorID = message.author.id

  if (Math.round(messagesSent/100 == messagesSent/100)) {
      //pokespawn here
  };

try {
	client.commands.get(command).execute(message, args, authorID, owner, c);
} catch (error) {
	console.error(error);
  if (allCommands.includes(command + '.js')) {
    message.reply('There was an error with that command, please make sure all the arguments are correct.');
  } else {
	message.reply('Invalid command.');
  }
}

if(message.attachments.first()){//checks if an attachment is sent
        if(owner.includes(authorID)){//Download only png (customize this)
            download(message.attachments.first().url, args[1]);//Function I will show later
        }
    }
	
});

client.login(token);