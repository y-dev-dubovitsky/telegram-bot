import { Context } from 'grammy';
import { State } from '../state/state.enum';

export const inlineMenuHandler = (ctx: Context): void => {
  const data = ctx.callbackQuery?.data;

  if (!data) {
    ctx.reply('Неизвестная команда. Пожалуйста, выберите опцию из меню.');
    return;
  }

  switch (data) {
    case 'GENERAL': {
      ctx.session.state = State.MAIN;
      ctx.reply('Вы на главной странице.');
      break;
    }
    case 'ABOUT': {
      // ctx.answerCallbackQuery(); // Отвечаем на колбэк-запрос, чтобы убрать "часики"
      ctx.session.state = State.MAIN;
      ctx.reply('Вы на странице about');
      break;
    }
    default: {
      ctx.reply('Неизвестная команда. Пожалуйста, выберите опцию из меню.');
    }
  }
};