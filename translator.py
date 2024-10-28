from transformers import MarianMTModel, MarianTokenizer

# Загрузка модели и токенизатора для перевода с английского на русский
model_name_en_to_ru = 'Helsinki-NLP/opus-mt-en-ru'
tokenizer_en_to_ru = MarianTokenizer.from_pretrained(model_name_en_to_ru)
model_en_to_ru = MarianMTModel.from_pretrained(model_name_en_to_ru)

# Загрузка модели и токенизатора для перевода с русского на английский
model_name_ru_to_en = 'Helsinki-NLP/opus-mt-ru-en'
tokenizer_ru_to_en = MarianTokenizer.from_pretrained(model_name_ru_to_en)
model_ru_to_en = MarianMTModel.from_pretrained(model_name_ru_to_en)

def translate(text, model, tokenizer):
    # Токенизация и генерация перевода
    translated = model.generate(**tokenizer(text, return_tensors="pt", padding=True))
    return tokenizer.decode(translated[0], skip_special_tokens=True)

# Примеры перевода
text_en = "Hello, how are you?"
text_ru = "Привет, как дела?"

# Перевод с английского на русский
translated_to_ru = translate(text_en, model_en_to_ru, tokenizer_en_to_ru)
print(f"Перевод с английского на русский: {translated_to_ru}")

# Перевод с русского на английский
translated_to_en = translate(text_ru, model_ru_to_en, tokenizer_ru_to_en)
print(f"Перевод с русского на английский: {translated_to_en}")
