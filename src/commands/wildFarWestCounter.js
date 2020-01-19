const readBank = require("../utils/databank");

const { chats } = readBank("meta");

module.exports = {
  chats: [chats.ME],
  name: "wildFarWest",
  description: "Calculate best strategy for wild far west game",
  middleware: ctx => {
    ctx.reply(
      `Hello world`,
      {
        parse_mode: "markdown"
      }
    );
  }
};
