const { generateUserWebhook } = require("@modules/webhooks");

module.exports = {
    event: "emojiMessageDetected",
    once: false,
    async execute(message, client, matches) {
        var text = message.content;
        // Replace matches with the emoji
        matches.forEach(function (match) {
            var emojiName = match.split(':').join("");
            var emoji = client.emojis.cache.find(emoji => emoji.name === emojiName);
            if (emoji === undefined) return;
            text = text.replace(match, "<" + (emoji.animated ? 'a' : '') + ":" + emoji.name + ":" + emoji.id + ">");
        });
        // If the message is equal means that no emoji was found, so we just skip the webhook.
        if (text == message.content) return;
        // Generate the webhook with user information.
        let webhook = await generateUserWebhook(message.author, message.channel);
        // send the message to the webhook
        await webhook.send({
            content: text,
        });
        // delete webhook from the guild.
        webhook.delete();
        if (message.deletable) message.delete();
    }
}