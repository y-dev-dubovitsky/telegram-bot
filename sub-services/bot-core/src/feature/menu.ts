import { InlineKeyboard, Keyboard } from 'grammy';

// Создаем клавиатуру с кнопками
export const keyboard = new Keyboard()
  .text('Домой')
  .row() // Добавляем новую строку
  .text('Доступные команды')
  .row() // Добавляем новую строку
  .text('Информация')
  .resized(); // Устанавливаем клавиатуру внизу

  // Создаем встроенную клавиатуру с кнопками
export const inlineKeyboard = new InlineKeyboard()
.text('Поговорить со мной', 'GENERAL')
.text('Перевести текст', 'ABOUT_US');


