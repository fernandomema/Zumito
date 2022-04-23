const botConfig = require('@config/bot.js');
const fs = require('fs')
const { Modal, showModal, TextInputComponent  } = require('discord-modals')

module.exports = {
    event: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        const { getConfig } = require("@modules/utils/data.js");
        var settings = await getConfig(interaction.guild);
        if (interaction.isCommand()) {

        } else if (interaction.isSelectMenu()) {
            console.log('interaction', interaction.customId);
            if (fs.existsSync("@commands/"+interaction.customId+".js")) {
                let event = require("@commands/"+interaction.customId+".js");
            }
        }
        let component = Object.values(settings.components).filter(c => c.customId == interaction.customId)[0];
        if(component !== undefined) {
            if (component.action.type == 'form') {
                const modal = new Modal()
                .setCustomId(settings.forms[component.action.form].modal.custom_id)
                .setTitle(settings.forms[component.action.form].modal.title);
                settings.forms[component.action.form].modal.components[0].components.forEach(comp => {
                    modal.addComponents(
                        new TextInputComponent() // We create a Text Input Component
                        .setCustomId(comp.custom_id)
                        .setLabel(comp.label)
                        .setStyle(comp.style == 1 ? 'SHORT' : 'LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                        .setMinLength(comp.min_length)
                        .setMaxLength(comp.max_length)
                        .setPlaceholder(comp.placeholder)
                        .setRequired(comp.required)
                      );
                });
                
                
                showModal(modal, {
                    client: client, // Client to show the Modal through the Discord API.
                    interaction: interaction // Show the modal with interaction data.
                })
            }
        }
    }
}