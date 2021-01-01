

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, authorID, owner) {
		code = args.join(' ');
    message.channel.send(c);
	},
};