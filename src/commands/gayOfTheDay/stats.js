const plural = require("plural-ru");

const { readBank } = require('../../utils/databank');

const { NAMESPACE } = require('./constants');

module.exports = {
  name: "gotdstats",
  description: "Статистика игры",
  middleware: ctx => {
    const data = readBank(NAMESPACE);
    const chatData = data[ctx.chat.id] || {};

    if (!chatData.stats) {
      ctx.reply('Вы ещё не играли в пидора дня, попробуйте сперва зарегистрироваться командой /gotdreg');
      return;
    }

    ctx.reply(
      "*Список пидорейших пидоров*:\n------------------\n1. Ты\n_шутка,_ загружаю...",
      { parse_mode: "markdown" }
    );

    let message = "";
    Object.keys(chatData.stats || {}).forEach(user => {
      message += `${user} - ${plural(
        chatData.stats[user],
        "%d раз",
        "%d раза",
        "%d раз"
      )}\n`;
    });

    setTimeout(() => ctx.reply(message), 500);
  }
};
