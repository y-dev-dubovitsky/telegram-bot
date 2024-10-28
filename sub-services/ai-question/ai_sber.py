from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = FastAPI()

# Загружаем модель и токенизатор
model_name = "sberbank-ai/rugpt3small_based_on_gpt2"  # Легковесная модель для русского языка
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Устанавливаем pad_token_id
model.config.pad_token_id = model.config.eos_token_id

# Функция для генерации ответа
def generate_answer(question: str) -> str:
    input_text = f"Вопрос: {question}"
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    attention_mask = torch.ones(input_ids.shape, dtype=torch.long)

    output = model.generate(
        input_ids=input_ids,
        max_length=150,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id
    )

    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return answer.split("Ответ:")[-1].strip()

# Определяем модель запроса
class Question(BaseModel):
    question: str

@app.post("/generate")
async def generate(question: Question):
    if not question.question:
        raise HTTPException(status_code=400, detail="Question parameter is required")

    answer = generate_answer(question.question)
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
