import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)

const funnyUniversalPhrases = [
  "А вы пробовали перезагрузиться?",
  "Интересно, а что скажет Гугл?",
  "Может, это просто баг в реальности?",
  "А вы уверены, что это вопрос?",
  "Может, это просто шутка, а мы не поняли?",
  "А вы пробовали спросить у кота?",
  "Может, это просто недостаток кофе?",
  "А вы пробовали подумать об этом по-другому?",
  "Может, это просто случайность в матрице?",
  "А вы пробовали спросить у будущего?"
];

function getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * funnyUniversalPhrases.length);
  return funnyUniversalPhrases[randomIndex];
}

async function ifUser(user, ctx) {
  if (['лев', 'Юля', 'Юлия', 'Логинова'].includes(user)) {
    await ctx.reply(
      `Здравствуй, мой любимый Лев =)`,
      );
  }
}

bot.command('start', async (ctx) => {
  await ctx.reply(
  `Здравствуй, мой дорогой ${ctx.message.from.first_name}. Я еще мало что умею, но я исправлюсь`,
  );
  await ctx.reply(
    `Скажите, как вас зовут?`,
    );
  });

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  ifUser(ctx.message.text, ctx)

  console.log(ctx)
  console.log(ctx.message.from)
  // Explicit usage
  await ctx.telegram.sendMessage(ctx.message.chat.id, getRandomPhrase())

  // Using context shortcut
  // await ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
  const result = []
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  await ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))