from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Загружаем модель и токенизатор
model_name = "gpt2"  # Вы можете использовать "gpt2-medium", "gpt2-large" и т.д. для более мощных моделей
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Функция для генерации ответа
def generate_answer(question):
    # Подготовка входных данных
    input_text = f"Вопрос: {question}\nОтвет:"
    input_ids = tokenizer.encode(input_text, return_tensors='pt')

    # Генерация текста
    output = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2)

    # Декодирование и вывод результата
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return answer.split("Ответ:")[-1].strip()

# Пример использования
question = "What is love?"
answer = generate_answer(question)
print(f"Ответ: {answer}")
