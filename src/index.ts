import 'dotenv/config';
import { Bot, session } from 'grammy';
import { inlineMenuHandler, messageTextHandler, startHandler } from './handler';
import { menuMiddleware } from './middleware/menu.middleware';
import { State } from './state/state.enum';

const bot = new Bot(process.env.BOT_TOKEN || '');

// Инициализация сессии
bot.use(
  session({
    initial: () => ({
      state: State.PREVIEW
    }),
  })
);

bot.use(menuMiddleware)

bot.command('start', startHandler);

// Обработчик колбэк-запросов
bot.on('callback_query:data', inlineMenuHandler);

// Обработчик текстовых сообщений
bot.on('message:text', messageTextHandler);

// Start the bot.
bot.start();
