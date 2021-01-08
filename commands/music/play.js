const commando = require('discord.js-commando');
const {Util, MessageEmbed} = require('discord.js')
const ytdl = require("ytdl-core");
const yts = require("yt-search");
var ffmpeg = require('ffmpeg');

module.exports = {
    name: "play",
    category: "music",
    usage: "play <url/search query>",
    description: "Plays a youtube video or adds it to the queue",
    run: async (bot, message, args, prefix, owner) => {
        const channel = message.member.voice.channel;
        if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!");
    
        
    
        var searchString = args.join(" ");
        
    
        var serverQueue = bot.queue.get(786719754140123138);
    
        try {var searched = await yts.search(searchString)} catch {message.channel.send("You didn't provide a song for me to play.")}
        if(searched.videos.length === 0)return message.channel.send("Looks like i was unable to find the song on YouTube")
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
        bot.queue.set(786719754140123138, queueConstruct);
        queueConstruct.songs.push(song);
    
        const play = async (song) => {
          const queue = bot.queue.get(786719754140123138);
          if (!song) {
            setTimeout(function () {
              if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
              queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
              message.channel.send("Leaving the voice channel because I think there are no songs in the queue. [GitHub](https://github.com/ThatGuyJamal/DeepWebAPI-Git-host)")
            }, 60000);
            queue.textChannel.send(`🎶 Music queue ended by ${message.author.tag} / ID:(${message.author.id})`).catch(console.error);
            return bot.queue.delete(786719754140123138);
          }
         
    
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
          bot.queue.delete(786719754140123138);
          await channel.leave();
          return message.channel.send(`I could not join the voice channel: ${error}`);
        }
    
    }
}