import { translate } from '@vitalets/google-translate-api';

export const translateTextTo = async (inputText: string, to: string) : Promise<string> => {
  const { text } = await translate(inputText, { to });

  return text;
}
