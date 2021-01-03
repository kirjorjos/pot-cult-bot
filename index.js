const keep_alive = require('./keep_alive.js')   //run bot a a webserver so repl keeps it alive
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const owner = process.env.OWNER
const fs = require('fs');   //file manager access
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if(err) console.error(err);
  let jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if(jsfiles.length <= 0) {
    console.log('No commands');
    return;
  }

  console.log(`Loading ${jsfiles.length} commands.`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.username}`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;
  
  let cmd = bot.commands.get(command.slice(prefix.length));
  try {
      if(cmd) cmd.run(bot, message, args, owner, prefix);
  } catch(e) {
    console.log(e.stack);
  }
});

bot.login(token);