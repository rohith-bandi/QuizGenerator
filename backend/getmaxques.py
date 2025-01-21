import argparse
import requests
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize
import json
import PyPDF2

# Function to split content into chunks
def split_into_chunks(text, max_sentences_per_chunk=6):
    sentences = sent_tokenize(text)
    chunks = [" ".join(sentences[i:i + max_sentences_per_chunk]) for i in range(0, len(sentences), max_sentences_per_chunk)]
    return chunks

# Fetch content from a URL
def generate_questions_from_file(file_path):
    try:
        #print(f"Attempting to read file: {file_path}")
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            content = ""
            for page in reader.pages:
                content += page.extract_text() + "\n"
        #print("File read successfully.")
    except Exception as e:
        return {"error": f"Error reading the PDF file: {str(e)}"}

    chunks = split_into_chunks(content, max_sentences_per_chunk=6)
    max_questions = len(chunks) - 1
    return {"max_questions": max_questions, "message": "Success"}



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get maximum number of questions possible")
    
    parser.add_argument('--file', help="Path to the uploaded file")

    args = parser.parse_args()

    try:
        if args.file:
            result = generate_questions_from_file(args.file)
        
        else:
            raise ValueError("Either --file or both --topic and --subTopic must be provided.")

        print(json.dumps(result, indent=2))
    except Exception as e:
        print(json.dumps({"error": str(e)}, indent=2))

        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error occurred: {e}")