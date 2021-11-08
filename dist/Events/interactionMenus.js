"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        if (interaction.isContextMenu()) {
            await interaction.deferReply();
            const command = client.interactionz.get(interaction.commandName);
            try {
                if (command) {
                    command.run(client, interaction);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    },
};
//# sourceMappingURL=interactionMenus.js.map