const Discord = require('discord.js');
const { getFooter } = require("@modules/utils/data.js");
const botConfig = require('@config/bot.js');
require("@modules/localization.js");

module.exports = {
    name: "userbanner",
    aliases: [],
    examples: [],
    hidden: false,
    admin: false,
    nsfw: false,
    cooldown: 0,
    dm: true,

    async execute(client, message, args) {

        const embed = new Discord.MessageEmbed()

            .setTitle("command.userbanner.title".trans() + " " + "WilliamAcosta#0001" ) //Banner of
            .setDescription("**" + "command.userbanner.fullImage".trans() + "**\n" + "[" + "command.userbanner.clickHere".trans() + "]" + "(" + `https://images-ext-1.discordapp.net/external/AbVtVcRDPHaeR6YzRxvACvl0cmPhrb_Vl1P8-V-tnpg/%3Fsize%3D2048/https/cdn.discordapp.com/banners/963953391061585972/a_043a2a4155868430140eb6d647e94d92.gif`+ ")")
            .setImage("https://images-ext-1.discordapp.net/external/AbVtVcRDPHaeR6YzRxvACvl0cmPhrb_Vl1P8-V-tnpg/%3Fsize%3D2048/https/cdn.discordapp.com/banners/963953391061585972/a_043a2a4155868430140eb6d647e94d92.gif")
            .setColor(botConfig.embeds.color)
            .setFooter({ text: getFooter((message.author || message.member.user).tag), iconURL: (message.author || message.user).avatarURL({ dynamic: true }) })

        return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
}