import argparse
import requests
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize
import json

# Function to split content into chunks
def split_into_chunks(text, max_sentences_per_chunk=6):
    sentences = sent_tokenize(text)
    chunks = [" ".join(sentences[i:i + max_sentences_per_chunk]) for i in range(0, len(sentences), max_sentences_per_chunk)]
    return chunks

# Fetch content from a URL
def get_geeksforgeeks_content(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            title = soup.find('h1').get_text(strip=True)
            content_section = soup.find('div', {'class': 'entry-content'}) or soup.find('article')
            paragraphs = content_section.find_all('p') if content_section else []
            content = ' '.join([para.get_text(strip=True) for para in paragraphs])
            return f"Title: {title}\n\nContent:\n{content}"
        return f"Failed to retrieve content. HTTP Status Code: {response.status_code}"
    except Exception as e:
        return f"Error occurred: {e}"

# Calculate maximum number of questions
def get_max_questions(topic, subTopic):
    urls = {
        # Topics for OS
        "OS": {
            "OS Basics": "https://www.geeksforgeeks.org/what-is-an-operating-system/?ref=lbp",
            "Structure of OS": "https://www.geeksforgeeks.org/operating-system-services/?ref=lbp",
            "Types of OS": "https://www.geeksforgeeks.org/batch-processing-operating-system/?ref=lbp",
            "Process Management": "https://www.geeksforgeeks.org/introduction-of-process-management/?ref=lbp",
            "CPU Scheduling": "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/?ref=lbp",
            "Threads": "https://www.geeksforgeeks.org/thread-in-operating-system/?ref=lbp",
            "Process Synchronization": "https://www.geeksforgeeks.org/introduction-of-process-synchronization/?ref=lbp",
            "Critical Section Problem": "https://www.geeksforgeeks.org/petersons-algorithm-in-process-synchronization/?ref=lbp",
            "Deadlocks": "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/?ref=lbp",
            "Memory Management": "https://www.geeksforgeeks.org/memory-management-in-operating-system/?ref=lbp",
            "Page Replacement": "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/?ref=lbp",
            "Storage Management": "https://www.geeksforgeeks.org/storage-management/?ref=lbp"
        },
        # Topics for DBMS
        "DBMS": {
            "Basics of DBMS": "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/?ref=lbp",
            "ER Model": "https://www.geeksforgeeks.org/introduction-of-er-model/?ref=lbp",
            "Relational Model": "https://www.geeksforgeeks.org/introduction-of-relational-model-and-codd-rules-in-dbms/?ref=lbp",
            "Relational Algebra": "https://www.geeksforgeeks.org/introduction-of-relational-algebra-in-dbms/?ref=lbp",
            "Functional Dependencies": "https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/?ref=lbp",
            "Normalisation": "https://www.geeksforgeeks.org/introduction-of-database-normalization/?ref=lbp",
            "TnC Control": "https://www.geeksforgeeks.org/concurrency-control-in-dbms/?ref=lbp",
            "Indexing, B and B+ Trees": "https://www.geeksforgeeks.org/indexing-in-databases-set-1/?ref=lbp",
            "File Organisation": "https://www.geeksforgeeks.org/file-organization-in-dbms-set-1/?ref=lbp"
        },
        "Java":{
            "Data Types in Java":"https://www.geeksforgeeks.org/data-types-in-java/?ref=lbp",
            "Variables in Java":"https://www.geeksforgeeks.org/variables-in-java/?ref=lbp",
            "Operators in Java":"https://www.geeksforgeeks.org/operators-in-java/?ref=lbp",
            "Control Statements":"https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/",
            "OOPS":"https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
            "Exception Handling":"https://www.javatpoint.com/exception-handling-in-java",
            "Multithreading and Concurrency":"https://www.geeksforgeeks.org/multithreading-in-java/",
            "Collections Framework":"https://www.programiz.com/java-programming/collections",
            "Generics":"https://www.geeksforgeeks.org/generics-in-java/",
            "I/O Streams":"https://www.geeksforgeeks.org/java-io-input-output-in-java-with-examples/",
            "Java-8 Features":"https://www.javatpoint.com/java-8-features",
            "File Handling":"https://www.geeksforgeeks.org/file-handling-in-java/",
            "JDBC":"https://www.geeksforgeeks.org/introduction-to-jdbc/",
            "Java Memory Management":"https://www.geeksforgeeks.org/java-memory-management/",
            "Spring Framework":"https://www.geeksforgeeks.org/introduction-to-spring-framework/"
      },
    "JavaScript":{
        "Basics in JavaScript":"https://www.geeksforgeeks.org/javascript/",
        "Arrow Function":"https://www.geeksforgeeks.org/arrow-functions-in-javascript/",
        "Regular Functions":"https://www.geeksforgeeks.org/difference-between-regular-functions-and-arrow-functions/",
        "High Order Functions":"https://www.freecodecamp.org/news/higher-order-functions-in-javascript-explained/",
        "DOM Manipulation":"https://www.geeksforgeeks.org/how-to-manipulate-dom-elements-in-javascript/",
        "Events and Event Handling":"https://www.geeksforgeeks.org/javascript-events/",
        "Closures and Scopes":"https://www.geeksforgeeks.org/difference-between-scope-and-closures-in-javascript/",
        "Prototypes and Inheritance":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
        "Asynchronous Programming":"https://www.geeksforgeeks.org/asynchronous-javascript/",
        "ES+6 Features":"https://www.geeksforgeeks.org/introduction-to-es6/",
        "Fetch API and AJAX":"https://www.geeksforgeeks.org/difference-between-ajax-and-fetch-api/",
        "JSON":"https://www.geeksforgeeks.org/javascript-json/",
        "React JS":"https://www.geeksforgeeks.org/react/",
        "Vue JS":"https://www.geeksforgeeks.org/vue-js/",
        "Angular JS":"https://www.geeksforgeeks.org/introduction-to-angularjs/",
        "Node JS":"https://www.geeksforgeeks.org/difference-between-node-js-and-javascript/"
        }
    
    }
    
    selected_url = urls.get(topic, {}).get(subTopic, None)
    if not selected_url:
        return {"max_questions": 0, "message": "Invalid topic or subTopic."}

    context = get_geeksforgeeks_content(selected_url)
    if "Failed to retrieve content" in context or "Error occurred" in context:
        return {"max_questions": 0, "message": "Failed to fetch content."}

    chunks = split_into_chunks(context, max_sentences_per_chunk=3)
    max_questions = len(chunks)-1  # Each chunk represents one potential question
    return {"max_questions": max_questions, "message": "Success"}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get maximum number of questions possible")
    parser.add_argument('--topic', help="Topic name", required=True)
    parser.add_argument('--subTopic', help="Sub-topic name", required=True)

    args = parser.parse_args()
    result = get_max_questions(args.topic, args.subTopic)
    print(json.dumps(result, indent=2))