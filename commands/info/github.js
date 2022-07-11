const Discord = require('discord.js');
const { getFooter } = require("@modules/utils/data.js");
const fetch = require("node-fetch");
const botConfig = require('@config/bot.js');
const emojis = require('@config/emojis');
require("@modules/localization.js");

module.exports = {
    name: "github",
    aliases: [],
    examples: [],
    permissions: [],
    botPermissions: [],
    hidden: true,
    admin: false,
    nsfw: false,
    cooldown: 0,
    slashCommand: true,
    dm: true,

    async execute(client, message, args) {

        if (!args.has(0)) {
            return await message.reply({
                content: emojis.deny + 'command.github.valid_username'.trans(),
                allowedMentions: {
                    repliedUser: false
                }
            });
        }

        const git = await fetch('https://api.github.com/users/' + (Array.from(args.values()).map(a => a.value).join(' ')))
            .then(res => res.json())
            .catch(async err => { });

        if (git === undefined || git.name === undefined) {
            return await message.reply({
                content: emojis.deny + 'command.github.enter_valid_user'.trans(),
                allowedMentions: {
                    repliedUser: false
                }
            });
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: 'command.github.author'.trans() + ' ' + git.name,url: git.html_url, iconURL: git.avatar_url, })
            .setDescription('**' + 'command.github.bio'.trans() + '**' + `\n${git.bio || 'command.github.not_provided'.trans()}`) // Not Provided
            .addField('command.github.user_info'.trans(), "**" + 'command.github.real_name'.trans() + "**: " + `${git.login || 'command.github.not_provided'.trans()}` + "\n" + " **" + 'command.github.location'.trans() + "**: " + `${git.location || 'command.github.not_provided'.trans()}` + "\n" + "**" + 'command.github.github_id'.trans() + "**: " + `${git.id}`, true)
            .addField('command.github.social_stats'.trans(), "**" + 'command.github.followers'.trans() + "**: " + `${git.followers}` + "\n" + "**" + 'command.github.following'.trans() + "**: " + `${git.following}`, true)
            .setImage(git.avatar_url)
            .setColor(botConfig.embeds.color)
            .setFooter({ text: getFooter((message.author || message.member.user).tag), iconURL: (message.author || message.user).avatarURL({ dynamic: true }) })

        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
}