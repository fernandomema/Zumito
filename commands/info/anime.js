const Discord = require('discord.js');
const { getFooter } = require("@modules/utils/data.js");
const botConfig = require('@config/bot.js');
const fetch = require("node-fetch");
require("@modules/localization.js");

module.exports = {
    name: "anime",
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
        name: "",
        description: "test.",
        optional: true,
        type: "string",
    }],

    async execute(client, message, args) {

            const metadata = await fetch('https://kitsu.io/api/edge/anime?filter[text]=' + Array.froms(args.values()).join())
                .then(res => res.json());

                if (metadata.data.length > 0 && metadata.data[0].attributes.coverImage != null) {

                const embed = new Discord.MessageEmbed()

                .setColor(botConfig.embeds.color)
                .setTitle(metadata.data[0].attributes.canonicalTitle)
                .setURL('https://kitsu.io/anime/' + metadata.data[0].attributes.slug)
                .setDescription("**Type:** " + metadata.data[0].type + "."  + "\n**Status:** "+ metadata.data[0].attributes.status + "." + " \n**Chapters:** " + metadata.data[0].attributes.episodeCount+" \n**Score:** " + metadata.data[0].attributes.averageRating + "/100 - #"+ metadata.data[0].attributes.ratingRank + "\n**Popularity:** "+ "#" + metadata.data[0].attributes.popularityRank + "\n**Transmission date:** " + metadata.data[0].attributes.startDate + " ~ " + metadata.data[0].attributes.endDate + "\n**NSFW:** " + metadata.data[0].attributes.nsfw)
                .setThumbnail(metadata.data[0].attributes.posterImage.medium)
                .setImage(metadata.data[0].attributes.coverImage.original)
                .setFooter(metadata.data[0].attributes.synopsis)

                }

        }
    }