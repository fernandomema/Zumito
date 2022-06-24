const Discord = require('discord.js');
const { getFooter } = require("@modules/utils/data.js");
const botConfig = require('@config/bot.js');
require("@modules/localization.js");

module.exports = {
	name: "avatar",
	aliases: [],
	examples: [],
	permissions: [],
	botPermissions: [],
	hidden: false,
	admin: false,
	nsfw: false,
	cooldown: 0,
	slashCommand: true,
	dm: true,
	args: [{
		name: "user",
		description: "Show the avatar of the mentioned user.",
		optional: true,
		type: "user",
	}],

	async execute(client, message, args) {

		// TODO: Search for user although it is not in that guild.

		let user = args.get('user')?.user || message.mentions?.users?.first() || (message.author || message.user);

		const embed = new Discord.MessageEmbed()

			.setAuthor({ name: 'command.avatar.author'.trans() + ' ' + user.tag, iconURL: "" })
			.setDescription("[Avatar URL](" + user.avatarURL({ size: 1024, dynamic: true }) + ")")
			.setImage(user.avatarURL({ size: 1024, dynamic: true }))
			.setColor(botConfig.embeds.color)
			.setFooter({ text: getFooter((message.author || message.member.user).tag), iconURL: (message.author || message.user).avatarURL({ dynamic: true }) })

		return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
	}
} 