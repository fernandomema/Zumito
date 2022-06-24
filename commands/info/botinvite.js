const Discord = require("discord.js");
const botConfig = require("@config/bot.js");
const { getFooter } = require("@modules/utils/data");
const Canvas = require('canvas');
const { join } = require('path');
const emojis = require('@config/emojis.js');
require("@modules/localization.js");

module.exports = {
	name: "botinvite",
	aliases: ["invite"],
	examples: [],
	permissions: [],
	botPermissions: [],
	hidden: false,
	admin: false,
	nsfw: false,
	cooldown: 0,
	slashCommand: true,
	dm: true,

	async execute(client, message, args) {

		const canvas = Canvas.createCanvas(1280, 640)
		const ctx = canvas.getContext("2d")

		const background = await Canvas.loadImage(join(__dirname, "../../assets/images", "invite.png"))
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height)


		ctx.fillStyle = "#E34F83"
		ctx.font = "100px serif"
		ctx.textAlign = 'center'

		ctx.fillText("command.invite.inviteMe".trans(), 400, 500)

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "invite.png")


		var embed = new Discord.MessageEmbed()
			.setAuthor({
				name: 'command.botinvite.author'.trans() + ' ' + botConfig.name,
				iconURL: ""
			})
			.setColor(botConfig.embeds.color)
			.setDescription('command.botinvite.description'.trans() + ' ' + emojis.cozysip)
			.setImage('attachment://invite.png')

		const row = new Discord.MessageActionRow()
			.addComponents(

				new Discord.MessageButton()
					.setLabel('command.botinvite.invite'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLInvite)
					.setEmoji('988649262042710026'),

				new Discord.MessageButton()
					.setLabel('command.botinvite.support'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLSupport)
					.setEmoji('879509411285045279'),

				new Discord.MessageButton()
					.setLabel('command.botinvite.website'.trans())
					.setStyle('LINK')
					.setURL(botConfig.botInvite.URLWebsite)
					.setEmoji('879510323676200980')

			);

		return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, files: [attachment], components: [row], ephemeral: true });
	}
}
