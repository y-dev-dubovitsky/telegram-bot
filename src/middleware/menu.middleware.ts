import { keyboard } from '../feature/menu';

// Мидлварка для автоматического добавления mainMenuKeyboard
export const menuMiddleware = async (ctx, next) => {
  // Проверяем, является ли команда /start
  if (ctx.update.message?.text === '/start') {
    // Пропускаем добавление клавиатуры для команды /start
    await next();
    return;
  }

  // Добавляем mainMenuKeyboard к каждому ответу
  ctx.reply = (text: string, options = {}) => {
    return ctx.api.sendMessage(ctx.chat.id, text, {
      ...options,
      reply_markup: keyboard,
    });
  };

  // Продолжаем выполнение следующей мидлварки
  await next();
};
