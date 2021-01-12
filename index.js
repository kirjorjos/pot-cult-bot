const keep_alive = require('./keep_alive.js')   //run bot a a webserver so repl keeps it alive
var ffmpeg = require('ffmpeg');
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const WIPCOMMANDS = process.env.WIPCOMMANDS;
const fs = require('fs');   //file manager access
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queue = new Map()
bot.snipes = new Map()

require('./handlers/command.js')(bot)

bot.on('messageDelete', function(message, channel){
  bot.snipes.set(message.channel.id, {
    pfp:message.author.avatarURL(),
    author:message.author.tag,
    content:message.content,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})
  


bot.on("ready", async () =>{
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "Awaiting commands.",  //The message shown
            type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
 });

bot.on("message", async message => {
  var messageContent = message.content.split("]** ").pop()
  try {
      if (message.author.bot && message.author.id !== 786720708378099763) return;
    if (!message.guild) return;
    if (!messageContent.startsWith(prefix)) return;
    

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = messageContent.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const owner = process.env.OWNER
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = bot.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    // If a command is finally found, run the command
    if (command) if (!WIPCOMMANDS.includes(command.name) || owner.includes(message.author.id))
        command.run(bot, message, args, prefix, owner);
  } catch(e) {
    console.log(e.stack);
    message.channel.send(`Something went wrong, try using ${prefix}help [cmd].`)
  }
});

bot.login(token);