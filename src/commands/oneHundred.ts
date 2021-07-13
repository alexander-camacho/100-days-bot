import { CommandInt } from "../interfaces/CommandInt";
import MemberModel from "../database/models/MemberModel";
import { MessageEmbed } from "discord.js";

export const oneHundred: CommandInt = {
    name: "100",
    description: "Creates a 100 days of Code update.",
    run: async (message) => {
        const { author, channel, content } = message;
        const text = content.split(" ").slice(1).join(" ")

        let targetMemberData = await MemberModel.findOne({ discordId: author.id })

        if (!targetMemberData) {
            targetMemberData = await MemberModel.create({
                discordId: author.id,
                round: 1,
                day: 0,
                timestamp: Date.now()
            })
        }

        targetMemberData.day++

        if (targetMemberData.day > 100) {
            targetMemberData.day = 1;
            targetMemberData.round++;
        }
        targetMemberData.timestamp = Date.now()
        await targetMemberData.save()

        const oneHundredEmbed = new MessageEmbed();
        oneHundredEmbed.setTitle("100 Days of Code")
        oneHundredEmbed.setDescription(text)
        oneHundredEmbed.setAuthor(author.username + "#" + author.discriminator, author.displayAvatarURL())

        oneHundredEmbed.addField("Round", targetMemberData.round, true);
        oneHundredEmbed.addField("Day", targetMemberData.day, true);
        oneHundredEmbed.setFooter("Day completed: " + new Date(targetMemberData.timestamp).toLocaleDateString());

        await channel.send(oneHundredEmbed)
        await message.delete()
    },
}
