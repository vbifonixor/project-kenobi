const { readBank, writeBank } = require('../../utils/databank');
const { NAMESPACE } = require('./constants');

module.exports = {
  name: "gotdreg",
  description: "Регистрация нового участника",
  middleware: ctx => {
    const { username } = ctx.from;

    const data = readBank(NAMESPACE);
    const chatData = data[ctx.chat.id] || {};

    const newData = {
      ...data,
      [ctx.chat.id]: {
        ...chatData,
        registered: [
          ...(chatData.registered || []).filter(el => el !== username),
          username
        ]
      }
    };

    writeBank(NAMESPACE, newData);

    ctx.reply(`@${ctx.from.username} успешно зарегистрирован!`);
  }
};
