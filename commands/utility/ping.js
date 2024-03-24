import { SlashCommandBuilder } from '@discordjs/builders';
export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		await interaction.editReply(`Pong! (${sent.createdTimestamp - interaction.createdTimestamp}ms)`);
	},
};