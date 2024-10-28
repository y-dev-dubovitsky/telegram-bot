import { Context } from 'grammy';
import { getAIAnswer } from '../service/question.service';
import { availableCommandsService } from '../service/available-commands.service';
import { State } from '../state/state.enum';

export const messageTextHandler = async (ctx: Context) => {
  const text: string | undefined = ctx.message?.text;

  //TODO Написать мидлварку которая состояние меняет
  if (isState(text)) {
    ctx.session.state = text;
  }

  switch (ctx.session.state) {
    case State.MAIN: {
      const aiAnswer = await getAIAnswer(text);
      ctx.reply(aiAnswer);
      break;
    }
    case State.TRANSLATE: {
      ctx.reply('Начинаю переводить');
      break;
    }
    case State.AVAILABLE_COMMANDS: {
      availableCommandsService(ctx);
      break;
    }
    default: {
      ctx.reply('Неизвестная команда. Пожалуйста, выберите опцию из меню.');
    }
  }
};

const isState = (text: string | undefined): boolean => {
  if (text === undefined) {
    return false;
  }
  return Object.values(State).includes(text as State);
};
