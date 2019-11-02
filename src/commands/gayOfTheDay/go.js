const fse = require("fs-extra");

const _get = require("lodash/get");
const _isEmpty = require("lodash/isEmpty");
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");
const parseISO = require("date-fns/parseISO");

const path = "src/commands/gayOfTheDay/data.bank";

module.exports = {
  name: "gotd",
  description: "Крутим барабан",
  middleware: ctx => {
    const data = fse.readJSONSync(path) || {};
    const chatData = data[ctx.chat.id] || {};

    const { lastPlayed, lastWinner } = chatData;

    if (_isEmpty(chatData) || !chatData.registered.length) {
      ctx.reply(
        "Чтобы поиграть, сначала нужно зарегистрироваться через /gotdreg"
      );
      return;
    }

    if (differenceInCalendarDays(new Date(), parseISO(lastPlayed)) < 1) {
      ctx.reply(
        `Извини, @${
          ctx.from.username
        }, придётся подождать до завтра. Сегодняшний пидор дня уже ${lastWinner}`
      );
      return;
    }

    const potd =
      chatData.registered[
        Math.floor(Math.random() * (chatData.registered || []).length)
      ];

    const newData = {
      ...data,
      [ctx.chat.id]: {
        ...chatData,
        stats: {
          ...chatData.stats,
          [potd]: _get(chatData, `stats[${potd}]`, 0) + 1
        },
        lastPlayed: new Date(),
        lastWinner: potd
      }
    };

    fse.outputJSONSync(path, newData);

    ctx.reply(`Пидор дня сегодня - @${potd}`);
  }
};
