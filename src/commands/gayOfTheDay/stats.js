const fse = require("fs-extra");

const plural = require("plural-ru");

const path = "src/commands/gayOfTheDay/data.bank";

module.exports = {
  name: "gotdstats",
  description: "Статистика игры",
  middleware: ctx => {
    const data = fse.readJSONSync(path) || {};
    const chatData = data[ctx.chat.id] || {};

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

    setTimeout(() => ctx.reply(message), 3000);
  }
};
