"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: "messageDelete",
    run: async (client, message) => {
        client.snipes.set(message.channel.id, {
            content: message.content,
            delete: message.author,
            canal: message.channel
        });
    }
};
//# sourceMappingURL=messageDelete.js.map