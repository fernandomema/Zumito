const botConfig = require("@config/bot.js");
const { getConfig, saveConfig, getFooter } = require("@modules/utils/data.js");
const { MessageEmbed, MessageActionRow } = require("discord.js");
require("@modules/localization.js");
const { Discord } = require('discord.js');

module.exports = {
	name : "embed", 
	aliases : [],
	ussage : 'embed [embed_name] [component_name]',
	examples: [],
	permissions: ["MANAGE_CHANNELS"], 
	botPermissions: [], 
	hidden : false,  
	admin : false,  
	nsfw : false,  
	cooldown: 0, 

	async execute(client, message, args) {
        var settings = await getConfig(message.guild);
        let embed = settings.embeds[args[0]];
        if(embed.content == "") delete embed.content;
        let component = settings.components[args[1]];
        const row = new MessageActionRow()
        .addComponents(
            component
        );
        embed.components = [row];
        message.channel.send(embed);
    }
}