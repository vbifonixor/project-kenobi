const readBank = require('../utils/databank');

const { chats } = readBank('meta');

module.exports = {
  chats: [chats.ALL],
  name: "chatid",
  description: "Display current chat ID",
  middleware: ctx => {
    ctx.reply(
      `Chat ID is: \`${ctx.chat.id}\`\nChat name is ${ctx.chat.title ||
        (ctx.chat.first_name
          ? `${ctx.chat.first_name} ${ctx.chat.last_name}`
          : ctx.chat.username)}`,
      {
        parse_mode: "markdown"
      }
    );
  }
};
