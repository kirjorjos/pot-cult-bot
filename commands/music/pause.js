module.exports = {
    name: "pause",
    category: "music",
    usage: "pause",
    description: "Pauses the current song",
    run: async (bot, message, args) => {
       const { MessageEmbed } = require('discord.js')
        const sendError = require('../../Util/error')
        const serverQueue = bot.queue.get(message.guild.id);

        const channel = message.author.voice.channel
        if (!channel) {
            return sendError("You are not in the corrent voice channel.", message.channel)
        }
         else if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            message.channel.send('I have paused the music.',)
        }
        return sendError("There is nothing playing in your server.", message.channel)
    }
}