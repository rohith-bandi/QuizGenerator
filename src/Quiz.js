// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';

// const Quiz = () => {
//     const [topic, setTopic] = useState('');
//     const [subTopic, setSubTopic] = useState('');
//     const [numQuestions, setNumQuestions] = useState('');
//     const [questionType, setQuestionType] = useState('');
//     const [maxQuestions, setMaxQuestions] = useState(0);
//     const navigate = useNavigate();

//     // Topic mapping
//     const topicMapping = {
//         OS: [
//             "OS Basics", "Structure of OS", "Types of OS", "Process Management", "CPU Scheduling",
//             "Threads", "Process Synchronization", "Critical Section Problem", "Deadlocks", "Memory Management",
//             "Page Replacement", "Storage Management"
//         ],
//         DBMS: [
//             "Basics of DBMS", "ER Model", "Relational Model", "Relational Algebra", "Functional Dependencies",
//             "Normalisation", "TnC Control", "Indexing, B and B+ Trees", "File Organisation"
//         ],
//         Java: [
//             "Data Types in Java", "Variables in Java", "Operators in Java", "Control Statements", "OOPS", "Multithreading and Concurrency", "Generics", "I/O Streams", "File Handling", "JDBC", "Java Memory Management", "Spring Framework"
//         ],
//         JavaScript: [
//             "Basics in JavaScript", "Arrow Function", "Regular Functions", "High Order Functions", "DOM Manipulation",
//             "Events and Event Handling", "Closures and Scopes", "Prototypes and Inheritance", "Asynchronous Programming",
//             "ES+6 Features", "Fetch API and AJAX", "JSON", "React JS", "Vue JS", "Angular JS", "Node JS"
//         ]
//     };

//     // Fetch max questions when topic or sub-topic changes
//     const fetchMaxQuestions = async () => {
//         if (topic && subTopic) {
//             try {
//                 const response = await fetch(`http://localhost:5001/getnumques?topic=${topic}&subTopic=${subTopic}`);
//                 const data = await response.json();
//                 setMaxQuestions(data.max_questions);
//             } catch (error) {
//                 alert('Error fetching max questions.');
//             }
//         }
//     };

//     // Trigger fetch when topic or sub-topic changes
//     useEffect(() => {
//         fetchMaxQuestions();
//     }, [topic, subTopic]);

//     const handleSubmit = async () => {
//         if (numQuestions && questionType && topic && subTopic) {
//             try {
//                 const email = localStorage.getItem('email'); // Assuming email is stored
//                 const response = await fetch('http://localhost:5001/api/generate-questions', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ topic, subTopic, questionType, numQuestions, email }),
//                 });
    
//                 const data = await response.json();
//                 if (data.questions) {
//                     navigate('/questions', { state: { questions: data.questions } });
//                 } else {
//                     alert('No questions generated.');
//                 }
//             } catch (error) {
//                 alert('Error generating questions.');
//             }
//         } else {
//             alert('Please select all fields.');
//         }
//     };
    

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//             <Header />
//             <section style={{ flex: 1, paddingTop: '180px' }}>
//                 <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>
//                     Welcome to Quiz Master! Let's make learning fun and exciting!
//                 </h3>
//                 <div style={styles.container}>
//                     <h5 style={{ marginBottom: '20px', textAlign: 'center' }}>Generating a Personalized Quiz on Selected Topic</h5>

//                     {/* Topic Selection */}
//                     <select
//                         style={styles.dropdown}
//                         value={topic}
//                         onChange={(e) => { setTopic(e.target.value); setSubTopic(''); setNumQuestions(''); setQuestionType(''); }}
//                     >
//                         <option value="">Select Topic</option>
//                         {Object.keys(topicMapping).map((key) => (
//                             <option key={key} value={key}>{key}</option>
//                         ))}
//                     </select>

//                     {/* Sub-Topic Selection */}
//                     <select
//                         style={styles.dropdown}
//                         value={subTopic}
//                         onChange={(e) => setSubTopic(e.target.value)}
//                     >
//                         <option value="">Select Sub-Topic</option>
//                         {topic && topicMapping[topic].map((sub, index) => (
//                             <option key={index} value={sub}>{sub}</option>
//                         ))}
//                     </select>

//                     {/* Number of Questions Selection */}
//                     <select
//                         style={styles.dropdown}
//                         value={numQuestions}
//                         onChange={(e) => setNumQuestions(e.target.value)}
//                         disabled={!maxQuestions || !topic || !subTopic} // Ensure topic, sub-topic, and maxQuestions are set
//                     >
//                         <option value="">Select Number of Questions</option>
//                         {Array.from({ length: maxQuestions }, (_, i) => i + 1).map((num) => (
//                             <option key={num} value={num}>{num}</option>
//                         ))}
//                     </select>



//                     {/* Question Type Selection */}
//                     <select
//                         style={styles.dropdown}
//                         value={questionType}
//                         onChange={(e) => setQuestionType(e.target.value)}
//                     >
//                         <option value="">Select Question Type</option>
//                         <option value="mcq">Multiple Choice Questions</option>
//                         <option value="short_qa">Short Answers</option>
//                     </select>

//                     {/* Submit Button */}
//                     <button style={styles.button} onClick={handleSubmit}>Generate Quiz</button>
//                 </div>
//             </section>
//             <Footer />
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '20px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         maxWidth: '50%',
//         margin: '20px auto',
//         backgroundColor: '#f9f9f9',
//     },
//     dropdown: {
//         marginBottom: '15px',
//         padding: '10px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//         width: '100%',
//     },
//     button: {
//         padding: '10px 20px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// export default Quiz;




import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';

const Quiz = () => {
    const [topic, setTopic] = useState('');
    const [subTopic, setSubTopic] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxQuestions, setMaxQuestions] = useState(0); // New state for max questions

    const topicMapping = {
                OS: [
                    "OS Basics", "Structure of OS", "Types of OS", "Process Management", "CPU Scheduling",
                    "Threads", "Process Synchronization", "Critical Section Problem", "Deadlocks", "Memory Management",
                    "Page Replacement", "Storage Management"
                ],
                DBMS: [
                    "Basics of DBMS", "ER Model", "Relational Model", "Relational Algebra", "Functional Dependencies",
                    "Normalisation", "TnC Control", "File Organisation"
                ],
                Java: [
                    "Data Types in Java", "Variables in Java", "Operators in Java", "Control Statements", "OOPS", "Multithreading and Concurrency", "Generics", "I/O Streams", "File Handling", "JDBC", "Java Memory Management", "Spring Framework"
                ],
                JavaScript: [
                    "Basics in JavaScript", "Arrow Function", "Regular Functions", "High Order Functions", "DOM Manipulation",
                    "Events and Event Handling", "Closures and Scopes", "Prototypes and Inheritance", "Asynchronous Programming",
                    "Fetch API and AJAX", "JSON", "React JS", "Vue JS", "Angular JS", "Node JS"
                ]
            };

    // Fetch max questions when topic or sub-topic changes
    useEffect(() => {
        const fetchMaxQuestions = async () => {
            if (topic && subTopic) {
                try {
                    const response = await fetch(`http://localhost:5001/getnumques?topic=${topic}&subTopic=${subTopic}`);
                    const data = await response.json();
                    setMaxQuestions(data.max_questions);
                } catch (error) {
                    alert('Error fetching max questions.');
                }
            }
        };

        fetchMaxQuestions();
    }, [topic, subTopic]);
    
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowAnswer(false); // Hide answer for the next question
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setShowAnswer(false); // Hide answer for the previous question
        }
    };

    const formatQuestion = (questionText) => {
        // List of common question words
        const questionWords = ['what', 'why', 'where', 'how', 'who', 'when'];
        
        // Capitalize the first letter
        let formattedQuestion = questionText.charAt(0).toUpperCase() + questionText.slice(1);
    
        // Check if the question starts with a common question word and does not end with a question mark
        const startsWithQuestionWord = questionWords.some(word => formattedQuestion.toLowerCase().startsWith(word));
        
        if (startsWithQuestionWord && !formattedQuestion.endsWith('?')) {
            formattedQuestion = formattedQuestion + ' ?';
        } else if (!formattedQuestion.endsWith('?')) {
            formattedQuestion = formattedQuestion + ' .';  // Add a period for non-questions
        }
    
        return formattedQuestion;
    };
        
    

    const handleSubmit = async () => {
        setError('');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
        setLoading(true); // Set loading to true when submitting

        if (!topic || !subTopic || !questionType || !numQuestions) {
            setError('Please select all fields');
            setLoading(false); // Stop loading if fields are not selected
            return;
        }

        try {
            const email = localStorage.getItem('email');
            if (!email) {
                setError('Email is required. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5001/api/generate-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, subTopic, questionType, numQuestions, email }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                } else {
                    setError('No questions generated or invalid response format.');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch questions');
            }
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false); // Stop loading when done
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <section style={{ flex: 1, paddingTop: '120px' }}>
            <h5 style={{ marginBottom: '0px', textAlign: 'center' }}>
            Welcome to Quiz Master! Let's make learning fun and exciting!
                </h5>
                <div style={styles.formContainer}>
                    <select style={styles.dropdown} value={topic} onChange={(e) => { 
                        setTopic(e.target.value); 
                        setSubTopic('');
                        setNumQuestions('');
                    }}>
                        <option value="">Select Topic</option>
                        {Object.keys(topicMapping).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                    <select style={styles.dropdown} value={subTopic} onChange={(e) => setSubTopic(e.target.value)}>
                        <option value="">Select Subtopic</option>
                        {topic && topicMapping[topic].map((sub, index) => (
                            <option key={index} value={sub}>{sub}</option>
                        ))}
                    </select>
                    <select style={styles.dropdown} value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="">Select Question Type</option>
                        <option value="mcq">MCQ's</option>
                        <option value="short_qa">Short Answers</option>
                    </select>
                    <select
                        style={styles.dropdown}
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        disabled={!maxQuestions || !topic || !subTopic}
                    >
                        <option value="">Select Number of Questions</option>
                        {Array.from({ length: maxQuestions }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <button
                        style={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!topic || !subTopic || !questionType || !numQuestions}
                    >
                        Submit
                    </button>
                </div>
                <hr style={styles.blackLine} />
                <h5 style={{ marginBottom: '10px', textAlign: 'center', color: '#333' }}>Generated Questions on Selected Topic</h5>
                 <div style={styles.container}>
                    {loading ? (
                        <div style={styles.loadingText}>Loading...</div>  // Display loading text or spinner
                    ) : questions.length === 0 ? (
                        <p style={styles.noQuestionsText}>No questions to display.</p>
                    ) : (
                        <div style={styles.questionItem}>
                            <p style={styles.questionText}><strong>Q{currentQuestionIndex + 1}:</strong> {formatQuestion(questions[currentQuestionIndex].question)}</p>
                            {questions[currentQuestionIndex].options && (
                                <ul style={styles.optionsList}>
                                    {questions[currentQuestionIndex].options.map((opt, idx) => (
                                        <li key={idx} style={styles.optionItem}>
                                            <strong>{String.fromCharCode(65 + idx)}:</strong> {opt}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {showAnswer ? (
                                <p style={styles.answerText}><strong>Answer:</strong> {questions[currentQuestionIndex].answer}</p>
                            ) : (
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    style={styles.showAnswerButton}
                                >
                                    Answer
                                </button>
                            )}
                            <div style={styles.navigationButtons}>
                                <button
                                    onClick={handleBack}
                                    disabled={currentQuestionIndex === 0}
                                    style={styles.navButton}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex === questions.length - 1}
                                    style={styles.navButton}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

const styles = {
    formContainer: {
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '75%',
        margin: 'auto',
        marginTop: '10px',
        flexWrap: 'wrap',
        paddingLeft: '8px',
        paddingRight: '8px',
    },
    dropdown: {
        marginRight: '10px',
        padding: '4px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '230px', // Adjusted width for a smaller dropdown
    },
    submitButton: {
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '120px', // Adjusted width for the submit button
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '50%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // height: '400px', // Fixed height for the question container
        // overflowY: 'auto', // To allow scrolling if content overflows
    },
    noQuestionsText: {
        color: '#888',
        fontSize: '1.2rem',
        textAlign: 'center',
    },
    questionItem: {
        marginBottom: '20px',
        textAlign: 'left',
        width: '100%',
    },
    questionText: {
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: '10px',
    },
    optionsList: {
        listStyleType: 'none',
        paddingLeft: '0',
        marginBottom: '10px',
    },
    optionItem: {
        backgroundColor: '#f1f1f1',
        padding: '8px 12px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontSize: '1rem',
    },
    answerText: {
        marginTop: '15px',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#28a745',
    },
    showAnswerButton: {
        padding: '8px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    blackLine: {
        border: 'none',
        borderTop: '2px solid black',
        width: '90%',
        margin: '20px auto',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'center', // This centers the buttons
        gap: '20px', // Adds space between the buttons
        marginTop: '20px',
        width: '100%',
    },
    navButton: {
        padding: '8px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    },
    loadingText: {
        fontSize: '1.2rem',
        color: '#333',
        fontWeight: 'bold',
    },
};
export default Quiz;
