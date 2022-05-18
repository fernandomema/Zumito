const { t } = require("localizify");
const botConfig = require("@config/bot.js");
const { getFooter } = require("@modules/utils/data");
const { MessageEmbed } = require("discord.js");
require("@modules/localization.js");
const { DisTube } = require('distube')

module.exports = {
	name : "play", 
	aliases : [],
	ussage : '',
	examples: [],
	permissions: [], 
	botPermissions: [], 
	hidden : false,  
	admin : false,  
	nsfw : false,  
	cooldown: 0, 

	async execute(client, message, args) {
        if (message.author.bot || !message.inGuild()) return;
        const voiceChannel = message.member?.voice?.channel;
        if (voiceChannel) {
            client.distube.play(voiceChannel, args.join(' '), {
                message,
                textChannel: message.channel,
                member: message.member,
            })
        } else {
            message.channel.send(
                'You must join a voice channel first.',
            )
        }
    }
}