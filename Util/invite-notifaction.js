module.exports = bot => {
  const invites = {}

  const getInviteCounts = async (guild) => {
    return await new Promise(resolve => {
      guild.fetchInvites().then(invites => {
        const inviteCounter = {}

        invites.forEach(invite => {
          const {uses, inviter} = invite
          const { username, discriminator, } = inviter

          const name = `${username}#${discriminator}`

          inviteCounter[name] = (inviteCounter[name] || 0) + uses
        })

        resolve(inviteCounter)
      })
    })
  }

  bot.guilds.cache.forEach(async (guild) => {
    invites[guild.id] = await getInviteCounts(guild)
  })

  bot.on('guildMemberAdd', async (member) => {
    const { guild, username } = member
    const invitesBefore = invites[guild.id]
    const invitesAfter = await getInviteCounts(guild)

    for (const inviter in invitesAfter) {
      if (invitesBefore[inviter] == invitesAfter[inviter] -1) {
        const channelID = '786722873116065842'
        const channel = guild.channels.cache.get(channelID)
        const count = invitesAfter[inviter]
        channel.send(`${username} joined with an invite created by ${inviter}.`)

        invites[guild.id] = invitesAfter
        return
      }
    }
  })
}