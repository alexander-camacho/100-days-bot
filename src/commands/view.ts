import { CommandInt } from "../interfaces/CommandInt";
import MemberModel, { Member } from "../database/models/MemberModel";
import { MessageEmbed } from "discord.js";

export const view: CommandInt = {
    name: "view",
    description: "View your current 100 Days of Code progress.",
    run: async (message) => {
        const { author, channel } = message;

        const targetMemberData = await MemberModel.findOne({ discordId: author.id });

        if (!targetMemberData) {
            await channel.send("You have not started the challenge yet.");
            return;
        }

        const memberEmbed = new MessageEmbed();
        memberEmbed.setTitle("My 100 Days of Code Progress");
        memberEmbed.setDescription(
            `Here is my 100 Days of Code progress. I last reported an update on ${new Date(targetMemberData.timestamp).toLocaleDateString()}.`
        );
        memberEmbed.addField("Round", targetMemberData.round, true);
        memberEmbed.addField("Day", targetMemberData.day, true);
        memberEmbed.setAuthor(author.username + "#" + author.discriminator, author.displayAvatarURL()
        );

        await channel.send(memberEmbed);
        await message.delete();
    },
}