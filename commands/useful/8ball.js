const responses = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes – definitely",
		"You may rely on it",
		"As I see it",
		"yes",
		"Most Likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
    "No, are you stupid?"
	];

module.exports = {
    name: "8ball",
    category: "useful",
    description: "8 ball",
    usage: "8ball",
    run: async (bot, message, args) => {
         randomIndex = Math.floor(Math.random() * responses.length);
         message.channel.send(responses[randomIndex]);
    }
}