module.exports = {
    name: "pfp",
    category: "useful",
    usage: "pfp <link>",
    description: "Changes the bot's pfp, bot owner only",
    run: async (bot, message, args, prefix, owner) => {
      bot.user.setAvatar(args[0])
    }
}