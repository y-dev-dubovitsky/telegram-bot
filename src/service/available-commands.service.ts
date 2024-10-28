import { Context } from "grammy";

// Обработчик команды /help
export const availableCommandsService = (ctx: Context): void => {
  const commands = [
    { command: '/start', description: 'Начать работу с ботом' },
    { command: '/help', description: 'Показать список доступных команд' },
    { command: '/about', description: 'Узнать больше о боте' },
    { command: '/image', description: 'Получить картинку' },
  ];

  const helpMessage = commands.map(cmd => `<b>${cmd.command}</b> - ${cmd.description}`).join('\n');

  ctx.reply(`<b>Доступные команды:</b>\n\n${helpMessage}`, { parse_mode: 'HTML' });
};