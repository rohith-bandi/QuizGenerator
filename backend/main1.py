import argparse
import json
import requests
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize
from transformers import T5ForConditionalGeneration, T5TokenizerFast as T5Tokenizer
import pytorch_lightning as pl
# from torch.optim import AdamW
from huggingface_hub import hf_hub_download
from transformers import (
    AdamW,
    T5ForConditionalGeneration,
    T5TokenizerFast as T5Tokenizer
    )

# Constants
MODEL_NAME = 't5-small'
LEARNING_RATE = 0.0001
SOURCE_MAX_TOKEN_LEN = 300
TARGET_MAX_TOKEN_LEN = 80
SEP_TOKEN = '<sep>'
TOKENIZER_LEN = 32101  # After adding the new <sep> token

# Question Generation Model
class QGModel(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME, return_dict=True)
        self.model.resize_token_embeddings(TOKENIZER_LEN) #resizing after adding new tokens to the tokenizer

    def forward(self, input_ids, attention_mask, labels=None):
        output = self.model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
        return output.loss, output.logits

    def training_step(self, batch, batch_idx):
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']
        loss, output = self(input_ids, attention_mask, labels)
        self.log('train_loss', loss, prog_bar=True, logger=True)
        return loss

    def validation_step(self, batch, batch_idx):
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']
        loss, output = self(input_ids, attention_mask, labels)
        self.log('val_loss', loss, prog_bar=True, logger=True)
        return loss

    def test_step(self, batch, batch_idx):
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']
        loss, output = self(input_ids, attention_mask, labels)
        self.log('test_loss', loss, prog_bar=True, logger=True)
        return loss
  
    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=LEARNING_RATE)


class QuestionGenerator():
    def __init__(self):
        self.tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
        # print('tokenizer len before: ', len(self.tokenizer))
        self.tokenizer.add_tokens(SEP_TOKEN)
        # print('tokenizer len after: ', len(self.tokenizer))
        self.tokenizer_len = len(self.tokenizer)

        checkpoint_path = hf_hub_download(repo_id="rohithbandi1/fine-tuned-t5-aiquiz", filename="model.ckpt")
        #self.qg_model = QGModel.load_from_checkpoint(checkpoint_path)
        self.qg_model = QGModel.load_from_checkpoint(checkpoint_path)
        self.qg_model.freeze()
        self.qg_model.eval()

    def generate(self, question_type:str, context: str ) -> str:
        model_output = self._model_predict(question_type, context)

        #generated_type, generated_question ,generated_answer= model_output.split('<sep>')

        return model_output
    
    def _model_predict(self, question_type:str, context: str ) -> str:
        source_encoding = self.tokenizer(
            '{} {} {}'.format(question_type,SEP_TOKEN, context),
            max_length= SOURCE_MAX_TOKEN_LEN,
            padding='max_length',
            truncation= True,
            return_attention_mask=True,
            add_special_tokens=True,
            return_tensors='pt'
            )

        generated_ids = self.qg_model.model.generate(
            input_ids=source_encoding['input_ids'],
            attention_mask=source_encoding['attention_mask'],
            num_beams=16,
            max_length=TARGET_MAX_TOKEN_LEN,
            repetition_penalty=2.5,
            length_penalty=1.0,
            early_stopping=True,
            use_cache=True
        )

        preds = {
            self.tokenizer.decode(generated_id, skip_special_tokens=True, clean_up_tokenization_spaces=True)
            for generated_id in generated_ids
        }

        return ''.join(preds)


def split_into_chunks(text, max_sentences_per_chunk=5):
    # Tokenize paragraph into sentences
    sentences = sent_tokenize(text)
    
    # Split sentences into chunks
    chunks = []
    for i in range(0, len(sentences), max_sentences_per_chunk):
        chunk = " ".join(sentences[i:i + max_sentences_per_chunk])
        chunks.append(chunk)
    
    return chunks


def get_geeksforgeeks_content(url):
    """Fetch and extract meaningful content from a GeeksforGeeks article."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract the article title
            title = soup.find('h1').get_text(strip=True)
            
            # Extract content within <article> or other main content sections
            content_section = soup.find('div', {'class': 'entry-content'})
            if not content_section:
                content_section = soup.find('article')
            
            # Extract paragraphs from the main content section
            paragraphs = content_section.find_all('p')
            content = ' '.join([para.get_text(strip=True) for para in paragraphs])
            
            return f"Title: {title}\n\nContent:\n{content}"
        else:
            return f"Failed to retrieve content. HTTP Status Code: {response.status_code}"
    except Exception as e:
        return f"Error occurred: {e}"

# Main function to handle argument passing and scraping
def generate_questions(topic, subTopic, questionType, numQuestions):
    # Define URLs for topics
    urls = {
        # Topics for OS
        "OS": {
            "OS Basics": "https://www.geeksforgeeks.org/what-is-an-operating-system/?ref=lbp",
            "Structure of Operating Systems": "https://www.geeksforgeeks.org/operating-system-services/?ref=lbp",
            "Types of OS": "https://www.geeksforgeeks.org/batch-processing-operating-system/?ref=lbp",
            "Process Management": "https://www.geeksforgeeks.org/introduction-of-process-management/?ref=lbp",
            "CPU Scheduling in OS": "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/?ref=lbp",
            "Threads in OS": "https://www.geeksforgeeks.org/thread-in-operating-system/?ref=lbp",
            "Process Synchronization": "https://www.geeksforgeeks.org/introduction-of-process-synchronization/?ref=lbp",
            "Critical Section Problem Execution": "https://www.geeksforgeeks.org/petersons-algorithm-in-process-synchronization/?ref=lbp",
            "Deadlocks & Deadlock Handling Methods": "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/?ref=lbp",
            "Memory Management": "https://www.geeksforgeeks.org/memory-management-in-operating-system/?ref=lbp",
            "Page Replacement Algorithms": "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/?ref=lbp",
            "Storage Management": "https://www.geeksforgeeks.org/storage-management/?ref=lbp"
        },
        # Topics for DBMS
        "DBMS": {
            "Basics of DBMS": "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/?ref=lbp",
            "Entity Relationship Model": "https://www.geeksforgeeks.org/introduction-of-er-model/?ref=lbp",
            "Relational Model": "https://www.geeksforgeeks.org/introduction-of-relational-model-and-codd-rules-in-dbms/?ref=lbp",
            "Relational Algebra": "https://www.geeksforgeeks.org/introduction-of-relational-algebra-in-dbms/?ref=lbp",
            "Functional Dependencies": "https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/?ref=lbp",
            "Normalisation": "https://www.geeksforgeeks.org/introduction-of-database-normalization/?ref=lbp",
            "Transactions and Concurrency Control": "https://www.geeksforgeeks.org/concurrency-control-in-dbms/?ref=lbp",
            "Indexing, B and B+ Trees": "https://www.geeksforgeeks.org/indexing-in-databases-set-1/?ref=lbp",
            "File Organisation": "https://www.geeksforgeeks.org/file-organization-in-dbms-set-1/?ref=lbp"
        }
    }

    # Fetch URL based on selected topic and sub-topic
    selected_url = urls.get(topic, {}).get(subTopic, None)
    if not selected_url:
        return {"questions": []}

    # Scrape the content
    context = get_geeksforgeeks_content(selected_url)
    if "Failed to retrieve content" in context or "Error occurred" in context:
        return {"questions": []}

    # Chunk the content
    chunks = split_into_chunks(context, max_sentences_per_chunk=3)

    # Initialize the question generator
    qg = QuestionGenerator()
    valid_question_types = ["fill_in_the_blanks", "mcq", "True_or_false", "short_qa"]

    if questionType not in valid_question_types:
        raise ValueError(f"Invalid question type: {questionType}. Choose from {valid_question_types}.")

    # Generate questions
    generated_questions = []
    for i, chunk in enumerate(chunks[:numQuestions]):
        raw_question = qg.generate(questionType, chunk)

        # Split the raw question using <sep>
        question_parts = raw_question.split(SEP_TOKEN)

        # Map the split parts to respective fields
        if len(question_parts) == 3:
            question_type = question_parts[0].strip()  # Question type
            question_text = question_parts[1].strip()  # Question text
            answer_text = question_parts[2].strip()  # Answer text
        else:
            question_type = questionType
            question_text = raw_question.strip()
            answer_text = ""

        generated_questions.append({
            "questionType": question_type,
            "question": question_text,
            "answer": answer_text,
            "context": chunk
        })

    return {"questions": generated_questions}
# Parse command-line arguments and call generate_questions if run directly
if __name__ == "__main__":
    import argparse
    import json

    # Define argument parser
    parser = argparse.ArgumentParser(description="Generate questions")
    parser.add_argument('--topic', required=True, help="The main topic (e.g., OS, DBMS)")
    parser.add_argument('--subTopic', required=True, help="The specific sub-topic under the main topic")
    parser.add_argument('--questionType', required=True, help="Type of question to generate (e.g., mcq, True_or_false)")
    parser.add_argument('--numQuestions', type=int, required=True, help="Number of questions to generate")

    # Parse arguments
    args = parser.parse_args()

    # Generate questions using the provided arguments
    try:
        result = generate_questions(args.topic, args.subTopic, args.questionType, args.numQuestions)
        # Print the result as JSON
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error: {e}")