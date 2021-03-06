const fs = require('fs');                   // Load filesystem node library
const path = require('path');
const { Collection, Client } = require('discord.js');              // Load discord js library
require('better-logging')(console);         // Load better logging
const {default: localizify} = require('localizify');         // Load localization library
var LocalStorage = require('node-localstorage').LocalStorage;   // Load local storage library for node
const {loadCommands} = require('@modules/utils/data.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

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
const commands = loadCommands(client, cmdir);
let commandsChoices = commands.map(c => {
    return {
        name: c.name,
        value: c.name
    }
}).filter(cc => cc.name);
commands.find(c => c.name == 'help').slashCommand.options[0].addChoices(...commandsChoices);

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands.map(c => c.slashCommand).filter(sc => sc != null) },
);
localStorage.setItem('commands', JSON.stringify(commands));

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

client.login(process.env.TOKEN);

global.discordClient = client;