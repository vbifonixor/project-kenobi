const fse = require("fs-extra");

const path = "src/commands/gayOfTheDay/data.bank";

module.exports = {
  name: "gotdreg",
  description: "Регистрация нового участника",
  middleware: ctx => {
    const { username } = ctx.from;

    const data = fse.readJSONSync(path) || {};
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

    fse.outputJSONSync(path, newData);

    ctx.reply(`@${ctx.from.username} успешно зарегистрирован!`);
  }
};
