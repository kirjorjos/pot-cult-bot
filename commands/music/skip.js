module.exports = {
    name: "skip",
    category: "music",
    usage: "skip",
    description: "Skips the currently playing song",
    run: async (bot, message, args) => {
       const { MessageEmbed } = require('discord.js')
        const serverQueue = bot.queue.get(786719754140123138);

        const channel = message.member.voice.channel
        if (!channel) {
            return message.channel.send("You are not in the corrent voice channel.")
        } else if (!serverQueue) {
            return message.channel.send("There is no music queue.")
        }
        serverQueue.connection.dispatcher.end("I have stopped the music.", message.channel)
        message.react('👍')
    }
}