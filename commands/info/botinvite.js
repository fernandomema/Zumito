// init require
const Discord = require("discord.js");
const botConfig = require("@config/bot.js");
const { getFooter } = require("@modules/utils/data");
const emoji = require('@config/emojis.js');
require("@modules/localization.js");

// export module
module.exports = {
	name: "botinvite",
	description: "Get tulipo invite urls",
	aliases: ["invite"],
	category: "Info",
	ussage: null,
	hidden: false,
	admin: true,
	nsfw: false,
	async execute(client, message, args) {

		// TODO: add message "Invite sended to DM", and send to the current channel and auto delete in 5 seconds 
		var embed = new Discord.MessageEmbed()

			.setAuthor({ name: 'command.botinvite.author'.trans() + ' ' + botConfig.name, iconURL: "" })
			.setColor(botConfig.embeds.color)
			.setDescription('command.botinvite.description'.trans() + ' ' + emoji.cozysip)
			.setImage(botConfig.botInvite.inviteBanner)

		const row = new Discord.MessageActionRow()

			.addComponents(

				new Discord.MessageButton()
					.setLabel('command.botinvite.invite'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLInvite)
					.setEmoji('879047987177852978'),

				new Discord.MessageButton()
					.setLabel('command.botinvite.support'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLSupport_Server)
					.setEmoji('879509411285045279'),

				new Discord.MessageButton()
					.setLabel('command.botinvite.website'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLWebsite)
					.setEmoji('879510323676200980')
			);

		return message.author.send({ components: [row], embeds: [embed] });

	}

}
