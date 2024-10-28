from transformers import AutoTokenizer, AutoModelForCausalLM

# Загрузка модели и токенизатора
tokenizer = AutoTokenizer.from_pretrained("ai-forever/rugpt3large_based_on_gpt2")
model = AutoModelForCausalLM.from_pretrained("ai-forever/rugpt3large_based_on_gpt2")

def generate_answer(question):
    # Кодирование вопроса в тензор
    inputs = tokenizer.encode(question, return_tensors='pt')
    
    # Генерация ответа
    outputs = model.generate(inputs, max_length=150, num_return_sequences=1)
    
    # Декодирование ответа
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return answer.strip()

# Пример использования
question = input("Задайте вопрос: ")
answer = generate_answer(question)
print("Ответ:", answer)