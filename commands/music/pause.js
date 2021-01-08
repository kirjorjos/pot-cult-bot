module.exports = {
    name: "pause",
    category: "music",
    usage: "pause",
    description: "Pauses the song, use play to resume",
    run: async (bot, message, args) => {
       const { MessageEmbed } = require('discord.js')
        const serverQueue = bot.queue.get(786719754140123138);

        const channel = message.member.voice.channel
        if (!channel) {
            return message.channel.send("You are not in the corrent voice channel.")
        } else if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            message.channel.send('i have paused the music.')
        }
        return message.channel.send("There is nothing playing in your server.")
    }
}