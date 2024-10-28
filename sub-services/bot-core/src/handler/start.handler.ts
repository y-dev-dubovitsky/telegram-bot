import { State } from '../state/state.enum';
import { inlineKeyboard } from '../feature/menu';
import * as path from 'path';
import { InputFile, Context } from 'grammy';

export const startHandler = async (ctx: Context) => {
  // Send the menu.
  ctx.session.state = State.START; // Устанавливаем начальное состояние

  await ctx.reply(
    'Привет, давайте знакомиться. Я ваш помошник и собеседник - HearLionBot'
  );

  const imagePath = path.join(process.cwd(), 'assets', 'OxNJezp5xoED.png');

  // Отправка фотографии
  await ctx.replyWithPhoto(new InputFile(imagePath));

  await ctx.reply(
    'Вы можете выбрать что-то из пункта меню или давайте просто поболтаем',
    {
      reply_markup: inlineKeyboard, // Возвращаем встроенную клавиатуру
    }
  );
};
