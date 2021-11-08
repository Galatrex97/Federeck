"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let nya = new mongoose_1.Schema({
    guildId: String,
    userId: String,
    content: Array
});
exports.default = (0, mongoose_1.model)("Warn", nya);
//# sourceMappingURL=warn.js.map