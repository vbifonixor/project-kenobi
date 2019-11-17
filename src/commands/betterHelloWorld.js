const readBank = require('./utils/databank');

const { chats } = readBank('meta');

module.exports = {
  chats: [chats.ME],
  name: "helloworld",
  description: "Say hi!",
  middleware: ctx => {
    ctx.reply(`Hello, ${ctx.chat.first_name}!`);
  }
};
