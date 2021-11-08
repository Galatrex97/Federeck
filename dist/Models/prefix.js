"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let prxSchema = new mongoose_1.Schema({
    Guild: String,
    Prefix: String,
});
exports.default = (0, mongoose_1.model)('prefix', prxSchema);
//# sourceMappingURL=prefix.js.map