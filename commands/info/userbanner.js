const Discord = require('discord.js');
const { getFooter } = require("@modules/utils/data.js");
const botConfig = require('@config/bot.js');
const emojis = require('@config/emojis.js'); 
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
        
        //Mensaje de usaurio sin banner.
        return message.reply({ content: emojis.deny + " " +"**" + "WilliamAcosta#0001" + "**" + " " + "command.userbanner.noBanner".trans() , allowedMentions: { repliedUser: false } });

    }
}

//Mensaje donde va el banner del usuario.

/* const embed = new Discord.MessageEmbed()

            .setTitle("command.userbanner.title".trans() + " " + "WilliamAcosta#0001" )
            .setDescription("**" + "command.userbanner.fullImage".trans() + "**\n" + "[" + "command.userbanner.clickHere".trans() + "]" + "(" + `https://images-ext-1.discordapp.net/external/AbVtVcRDPHaeR6YzRxvACvl0cmPhrb_Vl1P8-V-tnpg/%3Fsize%3D2048/https/cdn.discordapp.com/banners/963953391061585972/a_043a2a4155868430140eb6d647e94d92.gif`+ ")")
            .setImage("https://images-ext-1.discordapp.net/external/AbVtVcRDPHaeR6YzRxvACvl0cmPhrb_Vl1P8-V-tnpg/%3Fsize%3D2048/https/cdn.discordapp.com/banners/963953391061585972/a_043a2a4155868430140eb6d647e94d92.gif")
            .setColor(botConfig.embeds.color)
            .setFooter({ text: getFooter((message.author || message.member.user).tag), iconURL: (message.author || message.user).avatarURL({ dynamic: true }) })*/