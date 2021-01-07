const Discord = require('discord.js');

module.exports = {
    name: "poll",
    category: "useful",
    usgae: "poll <poll>",
    description: "basic poll",
    run: async (bot, message, args) => {
        let pollDescription = args.slice(0).join(' ');

        let embedPoll = new Discord.MessageEmbed()
        .setTitle('Poll')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await message.channel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}