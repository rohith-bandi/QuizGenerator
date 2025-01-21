# Quiz Generator

## Overview
The Quiz Generator is an automated system that enables users to create customized quizzes by selecting their preferred subject, topic, and question types. Users can also upload a PDF to generate questions directly from the content. The system leverages fine-tuned T5 Large Language Model (LLM) and web scraping to deliver high-quality and tailored quiz content.

## Key Features
- **Custom Question Generation:** Select subject, topic, and desired question types (e.g., multiple choice, true/false, short answer).
- **PDF Upload Support:** Generate questions directly from an uploaded PDF document.
- **Advanced AI Integration:** Utilizes a fine-tuned T5 LLM for diverse question types.
- **Seamless Workflow:** Web scraping to gather relevant data and integrate it into question generation.

## Workflow
1. **User Input:**
   - Select a subject and topic from the dropdown menu.
   - Specify the type (e.g., multiple-choice, true/false) and number of questions.
   - Optionally, upload a PDF to base the quiz questions on.
2. **Data Collection:**
   - Relevant information is scraped from the web based on the selected topic or subtopic.
3. **Question Generation:**
   - The fine-tuned T5 LLM generates the requested question types.
4. **Frontend Delivery:**
   - The generated questions are displayed in the user interface for review and utilization.

## Technology Stack
### T5 Large Language Model (LLM)
The T5 LLM is fine-tuned using the following datasets to ensure high-quality question generation:
- **BOOLQ:** Enhances the model’s ability to generate true/false questions.
- **MS-MARCO:** Enables the generation of short-answer questions.
- **CBT:** Trains the model to create fill-in-the-blank questions.
- **RACE:** Facilitates the creation of multiple-choice questions.

## User Interface
The user interface provides an intuitive experience for selecting preferences and reviewing generated questions. Dropdown menus and upload options ensure seamless interaction.

## Acknowledgments
The T5 model by Google for its powerful language generation capabilities.
The datasets BOOLQ, MS-MARCO, CBT, and RACE for fine-tuning the model.
