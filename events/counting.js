import { Events } from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (interaction.channelId === '1186292004401971203') {
            const count = parseInt(interaction.content);
            const lastMessages = await interaction.channel.messages.fetch({ limit: 10 })
            if (isNaN(count)) return;
            if (isNaN(parseInt(lastMessages.first(2)[1].content)) && count === 1) return;
            if ((count === parseInt(lastMessages.first(2)[1].content + 1))) return;
            else {
                interaction.channel.send(`You messed up! The next number was ${lastMessages[1]+1}.`);
            }
        }
    }
}