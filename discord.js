const fs = require('fs');                   // Load filesystem node library
const path = require('path');
const { Collection, Client } = require('discord.js');              // Load discord js library
require('better-logging')(console);         // Load better logging
const {default: localizify} = require('localizify');         // Load localization library
var LocalStorage = require('node-localstorage').LocalStorage;   // Load local storage library for node
const {loadCommands} = require('@modules/utils/data.js');
const { DisTube } = require('distube')

console.logLevel = process.env.LOGLEVEL || 3;

const client = new Client({ 
    intents: [
        "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", 
        "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", 
        "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", 
        "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", 
        "DIRECT_MESSAGES"
    ]
});

if (process.env.DEBUG == true || process.env.DEBUG == 'true') {
    let {initializeDebug} = require('@modules/utils/debug.js');
    initializeDebug(client);
}

// Load languages
const en = require('./localization/en.json');
const es = require('./localization/es.json');
localizify
  .add('en', en)
  .add('es', es)
  .setLocale('en');

// Initialize local storage
localStorage = new LocalStorage('./cache');

// Define commands
const cmdir = path.resolve('./commands');
client.commands = new Collection();
localStorage.setItem('commands', JSON.stringify(loadCommands(client, cmdir)));

// Event handler
fs.readdir('./events/discord', (err, files) => { // We use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
        const eventFunction = require(`./events/discord/${file}`); // Here we require the event file of the events folder
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.execute(...args, client)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});

// Create a new DisTube
client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    customFilters: { 
		"errape": "superequalizer=1b=20:2b=20:3b=20:4b=20:5b=20:6b=20:7b=20:8b=20:9b=20:10b=20:11b=20:12b=20:13b=20:14b=20:15b=20:16b=20:17b=20:18b=20,volume=10,acrusher=.1:1:64:0:log", 
		"8d": "apulsator=hz=0.075,aecho=0.8:0.9:40|50|70:0.4|0.3|0.2",
		"synth": "aphaser=type=t:speed=2:decay=0.6",
		"avibrato": "vibrato=f=4",
        "8d-beta": "-af apulsator=hz=0.125"
	} 
})

// DisTube event listeners, more in the documentation page
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n`, //${status(queue)}
        ),
    )
    .on('addSong', (queue, song) =>
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ),
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
    .on('error', (textChannel, e) => {
        console.error(e)
        textChannel.send(
            `An error encountered: ${e.message.slice(0, 2000)}`,
        )
    })
    .on('finish', queue => queue.textChannel?.send('Finish queue!'))
    .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
    )
    .on('disconnect', queue =>
        queue.textChannel?.send('Disconnected!'),
    )
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
    // DisTubeOptions.searchSongs > 1
    .on('searchResult', (message, result) => {
        let i = 0
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${
                            song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        )
    })
    .on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )
    .on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )
    .on('searchNoResult', message =>
        message.channel.send('No result found!'),
    )
    .on('searchDone', () => {})

client.login(process.env.TOKEN);

global.discordClient = client;