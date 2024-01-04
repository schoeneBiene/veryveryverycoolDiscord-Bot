const discord = require('discord.js');

module.exports = async (client, messageDeleted) => {
    try {
        if (!messageDeleted) return;
        if (messageDeleted.author.bot) return;

        var content = messageDeleted.content;
        if (!content) content = "No text to be found";

        if (messageDeleted.attachments.size > 0) content = messageDeleted.attachments.first()?.url;

        const logsChannel = await client.getLogs(messageDeleted.guild.id);
        if (!logsChannel) return;

        client.embed({
            title: `literally 1984`,
            desc: `A SQL statement walks into a bar and sees two tables.It approaches, and asks may I join you?`,
            fields: [
                {
                    name: `> Author`,
                    value: `- ${messageDeleted.author} (${messageDeleted.author.tag})`
                },
                {
                    name: `> Date`,
                    value: `- ${messageDeleted.createdAt}`
                },
                {
                    name: `> Channel`,
                    value: `- ${messageDeleted.channel} (${messageDeleted.channel.name})`
                },
                {
                    name: `> Message`,
                    value: `\`\`\`${content.replace(/`/g, "'")}\`\`\``
                },
                {
                    name: `> Timestamp`,
                    value: `- <t:${Math.floor(messageDeleted.createdTimestamp / 1000)}:R>`
                }
            ]
        }, logsChannel).catch(() => { })
    }
    catch { }
};