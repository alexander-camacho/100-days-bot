import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";
import { MessageEmbed } from "discord.js";

export const help: CommandInt = {
    name: "help",
    description: "Returns the bot's available commands",
    run: async(message) => {
        const helpEmbed = new MessageEmbed();
        helpEmbed.setTitle("Available Commands:")
        helpEmbed.setDescription("These are the available commands for this bot.")
        helpEmbed.addField("Commands: ", CommandList.map((el) => `\`!${el.name}\`:${el.description}`).join("\n"))

        await message.channel.send(helpEmbed); 
    }
}