module.exports.run = async (bot, message, args, prefix) => {
  message.channel.send('Pong!');
}

module.exports.help = {
  name: "ping"
}