const readBank = require('../../utils/databank');

const { chats } = readBank('meta');

module.exports = {
  type: "group",
  commands: [require("./register"), require("./go"), require("./stats")],
  description: "Gay of the day game",
  chats: [chats.ME, chats.TEST_SUITE, chats.KPOB, chats.HUYAFIA],
};
