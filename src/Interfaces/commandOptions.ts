import { PermissionString } from "discord.js";

export interface CommandOptions {
    name: string;
    aliases: Array<string>;
    description: string;  
    usage: string;
    category: string;
    cooldown: number;
    botPerms: Array<PermissionString>;
    userPerms: Array<PermissionString>;
    devOnly: boolean;
    unstable?: boolean;
    guildOnly: boolean;
};