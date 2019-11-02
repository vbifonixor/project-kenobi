const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const commands = require("./commands");

const help = commands => ({ chat: { id }, reply }) => {
  let message = "*Commands for this bot:* \n";

  commands
    .filter(({ chats }) => chats.includes(id))
    .forEach(command => {
      const introduceCommand = cmd => `/${cmd.name} — ${cmd.description}\n`;

      if (command.type === "group") {
        message += `\n*${command.description}*\n`;

        command.commands.forEach(cmd => {
          message += introduceCommand(cmd);
        });
      } else {
        message += introduceCommand(command);
      }
    });

  reply(message, { parse_mode: "markdown" });
};

const checkCommand = chats => (ctx, next) => {
  if (chats.includes(ctx.chat.id)) {
    next();
  }
};

const registerGroup = (bot, { commands, chats }) => {
  return commands.map(command => registerCommand(bot, { ...command, chats }));
};

const registerCommand = (bot, { name, middleware, chats }) => {
  return bot.command(name, Telegraf.compose([checkCommand(chats), middleware]));
};

commands.map(command =>
  command.type === "group"
    ? registerGroup(bot, command)
    : registerCommand(bot, command)
);

bot.command("help", help(commands));

bot.start(ctx => ctx.reply("Hello world!"));

bot.launch();
