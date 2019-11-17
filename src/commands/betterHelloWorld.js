const chats = require("../../config/chats.json");

module.exports = {
  chats: [chats.ME],
  name: "helloworld",
  description: "Say hi!",
  middleware: ctx => {
    ctx.reply(`Hello, ${ctx.chat.first_name}! It's really nice to finally meet you!`);
  }
};
