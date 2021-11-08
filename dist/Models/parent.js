"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let parentSchema = new mongoose_1.Schema({
    parentId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
});
exports.default = (0, mongoose_1.model)('Parent', parentSchema);
//# sourceMappingURL=parent.js.map