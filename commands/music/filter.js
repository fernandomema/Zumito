const { t } = require("localizify");
const botConfig = require("@config/bot.js");
const { getFooter } = require("@modules/utils/data");
const { MessageEmbed } = require("discord.js");
require("@modules/localization.js");
const { DisTube } = require('distube')

module.exports = {
	name : "filter", 
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
            if (
				[
					'3d',
					'bassboost',
					'echo',
					'karaoke',
					'nightcore',
					'vaporwave',
					'earwax',
					'reverse',
					'errape',
					'8d',
					'synth',
					'avibrato',
					'8d-beta'
				].includes(args[0])
			) {
				const filter = client.distube.setFilter(message, args[0])
				message.channel.send(
					`Current queue filter: ${filter.join(', ') || 'Off'}`,
				)
			}
        } else {
            message.channel.send(
                'You must join a voice channel first.',
            )
        }
    }
}