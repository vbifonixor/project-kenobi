const fse = require("fs-extra");

const { DATA_BANK_PATH } = require('./constants');

module.exports = {
  name: "gotdreg",
  description: "Регистрация нового участника",
  middleware: ctx => {
    const { username } = ctx.from;

    const data = fse.readJSONSync(DATA_BANK_PATH) || {};
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

    fse.outputJSONSync(DATA_BANK_PATH, newData);

    ctx.reply(`@${ctx.from.username} успешно зарегистрирован!`);
  }
};
