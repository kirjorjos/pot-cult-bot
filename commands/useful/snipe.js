const Discord = require('discord.js');

module.exports = {
    name: "snipe",
    category: "useful",
    usage: "snipe",
    description: "Snipes a deleted message",
    run: async (bot, message, args) => {
      const msg = bot.snipes.get(message.channel.id)
      if(!msg) return message.channel.send('Nothing to snipe.')
        message.channel.createWebhook(msg.author, {
        	avatar: 'https://i.imgur.com/wSTFkRM.png',
        })
        var webhooks = await message.channel.fetchWebhooks();
		    var webhook = webhooks.first();
        await webhook.send(msg.content, {
	        username: msg.author.slice(0, -5),
	        avatarURL: msg.pfp,
          content: msg.content,
        });
        webhook.delete();
      }
    }