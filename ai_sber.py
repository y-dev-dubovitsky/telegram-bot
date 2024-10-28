from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

#model_name = "sberbank-ai/rugpt2small"
# Загружаем модель и токенизатор
model_name = "sberbank-ai/rugpt3small_based_on_gpt2"  # Легковесная модель для русского языка
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Устанавливаем pad_token_id
model.config.pad_token_id = model.config.eos_token_id

# Функция для генерации ответа
def generate_answer(question):
    # Подготовка входных данных
    input_text = f"Вопрос: {question}"
    input_ids = tokenizer.encode(input_text, return_tensors='pt')

    # Создаем attention mask
    attention_mask = torch.ones(input_ids.shape, dtype=torch.long)

    # Генерация текста
    output = model.generate(
        input_ids=input_ids,
        max_length=150,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id  # Используем токен конца последовательности
    )

    # Декодирование и вывод результата
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return answer.split("Ответ:")[-1].strip()

# Пример использования
if __name__ == "__main__":
    question = "Расскажи мне про москву"
    answer = generate_answer(question)
    print(f"Ответ: {answer}")
