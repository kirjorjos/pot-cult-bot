const commando = require('discord.js-commando');
const {Util, MessageEmbed} = require('discord.js')
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require('../../Util/error')

module.exports = {
    name: "play",
    category: "music",
    usage: "play <URL/Search>",
    description: "Plays a youtube song",
    run: async (bot, message, args) => {
       const channel = message.member.voice.channel;
        if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
        if (!permissions.has("SPEAK"))return sendError("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);
    
        var searchString = args.join(" ");
        if (!searchString)return sendError("You didn't provide a song for me to play.", message.channel);
    
        var serverQueue = message.client.queue.get(message.guild.id);
    
        var searched = await yts.search(searchString)
        if(searched.videos.length === 0)return sendError("Looks like i was unable to find the song on YouTube", message.channel)
        var songInfo = searched.videos[0]
    
        const song = {
          id: songInfo.videoId,
          title: Util.escapeMarkdown(songInfo.title),
          views: String(songInfo.views).padStart(10, ' '),
          url: songInfo.url,
          ago: songInfo.ago,
          duration: songInfo.duration.toString(),
          img: songInfo.image,
          req: message.author
        };

    
        if (serverQueue) {
          serverQueue.songs.push(song);
          let thing = new MessageEmbed()
          .setAuthor("Song has been added to queue", "https://github.com/ThatGuyJamal/DeepWebAPI-Git-host/blob/master/src/assets/Music.gif")
          .setThumbnail(song.img)
          .setColor("YELLOW")
          .addField("Name", song.title, true)
          .addField("Duration", song.duration, true)
          .addField("Requested by", song.req.tag, true)
          .setFooter(`Views: ${song.views} | ${song.ago}`)
          .addField("Url", song.url, false)
          return message.channel.send(thing);
        }
    
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: channel,
          connection: null,
          songs: [],
          volume:3,    
          playing: true, //! If you want the bot to stay in a vc and not remove this line.
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
    
        const play = async (song) => {
          const queue = bot.queue.get(message.guild.id);
          if (typeof(song) == 'undefined') {
            console.log(song)
            queue.textChannel.send(`🎶 Music queue ended by ${message.author.tag} / ID:(${message.author.id})`).catch(console.error);
            return message.client.queue.delete(message.guild.id);
          }
         
          console.log(ytdl(song.url))
          const dispatcher = queue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
              queue.songs.shift();
              play(queue.songs[0]);
            })
            .on("error", (error) => console.error(error));
          dispatcher.setVolumeLogarithmic(queue.volume / 5);
          let thing = new MessageEmbed()
          .setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
          .setThumbnail(song.img)
          .setColor("BLUE")
          .addField("Name", song.title, true)
          .addField("Duration", song.duration, true)
          .addField("Requested by", song.req.tag, true)
          .setFooter(`Views: ${song.views} | ${song.ago}`)
          .addField("Url", song.url, false)
          queue.textChannel.send(thing);
        };
    
        try {
          const connection = await channel.join();
          queueConstruct.connection = connection;
          channel.guild.voice.setSelfDeaf(true)
          play(queueConstruct.songs[0]);
          
        } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
          message.client.queue.delete(message.guild.id);
          await channel.leave();
          return sendError(`I could not join the voice channel: ${error}`, message.channel);
        }
    }
}