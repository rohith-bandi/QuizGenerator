// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';

// const Cquiz = () => {
//   const [file, setFile] = useState(null);
//   const [questionType, setQuestionType] = useState('');
//   const [numQuestions, setNumQuestions] = useState('');
//   const [maxQuestions, setMaxQuestions] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];

//     if (uploadedFile && uploadedFile.type !== 'application/pdf') {
//       setError('Please upload a valid PDF file.');
//       setFile(null);
//       return;
//     }

//     const maxSize = 10 * 1024 * 1024; // 10MB
//     if (uploadedFile && uploadedFile.size > maxSize) {
//       setError('File size should be less than 10MB.');
//       setFile(null);
//       return;
//     }

//     setFile(uploadedFile);
//     setMaxQuestions(0);
//     setQuestions([]);
//     setError('');

//     fetchMaxQuestions(uploadedFile);
//   };

//   const fetchMaxQuestions = async (uploadedFile) => {
//     if (!uploadedFile) {
//       setError('Please upload a file before fetching max questions.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', uploadedFile);

//     try {
//       const response = await fetch('http://localhost:5001/getmaxques', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMaxQuestions(data.max_questions || 0);
//         setError('');
//       } else {
//         const errorText = await response.text();
//         setError('Failed to fetch max questions: ' + errorText);
//       }
//     } catch (err) {
//       console.error('Error fetching max questions:', err);
//       setError('Error fetching max questions: ' + err.message);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!file || !questionType || !numQuestions) {
//       setError('Please upload a file and select all fields.');
//       return;
//     }

//     const email = localStorage.getItem('email');
//     if (!email) {
//       setError('Email is required. Please log in again.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('questionType', questionType);
//     formData.append('numQuestions', numQuestions);
//     formData.append('email', email);

//     try {
//       const response = await fetch('http://localhost:5001/api/upload-and-generate-questions', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setQuestions(data.questions || []);
//         setError('');

//         // Redirect to QuestionsPage and pass the questions as state
//         navigate('/questions', { state: { questions: data.questions } });
//       } else {
//         const errorText = await response.text();
//         setError('Failed to fetch questions: ' + errorText);
//       }
//     } catch (err) {
//       console.error('Error generating questions:', err);
//       setError('Error generating questions: ' + err.message);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Header />
//       <section style={{ flex: 1, paddingTop: '180px' }}>
//         <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>
//           Welcome to Quiz Master! Let's make learning fun and exciting!
//         </h3>
//         <div style={styles.container}>
//           <h5 style={{ marginBottom: '20px', textAlign: 'center' }}>Generating a Personalized Quiz on Uploaded Document</h5>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             style={styles.dropdown}
//           />
//           <select
//             style={styles.dropdown}
//             value={numQuestions}
//             onChange={(e) => setNumQuestions(e.target.value)}
//             disabled={!maxQuestions}
//           >
//             <option value="">Select Number of Questions</option>
//             {Array.from({ length: maxQuestions }, (_, i) => i + 1).map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//           <select
//             style={styles.dropdown}
//             value={questionType}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             <option value="">Select Question Type</option>
//             <option value="mcq">Multiple Choice Questions</option>
//             <option value="short_qa">Short Answers</option>
//           </select>
//           <button
//             style={styles.button}
//             onClick={handleSubmit}
//             disabled={!file || !questionType || !numQuestions}
//           >
//             Submit
//           </button>
//           {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     maxWidth: '50%',
//     margin: '20px auto',
//     backgroundColor: '#f9f9f9',
//   },
//   dropdown: {
//     marginBottom: '15px',
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

// export default Cquiz;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';

const Cquiz = () => {
  const [file, setFile] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile && uploadedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      setFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (uploadedFile && uploadedFile.size > maxSize) {
      setError('File size should be less than 10MB.');
      setFile(null);
      return;
    }

    setFile(uploadedFile);
    setMaxQuestions(0);
    setQuestions([]);
    setError('');
    fetchMaxQuestions(uploadedFile);
  };

  const fetchMaxQuestions = async (uploadedFile) => {
    if (!uploadedFile) {
      setError('Please upload a file before fetching max questions.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:5001/getmaxques', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMaxQuestions(data.max_questions || 0);
        setError('');
      } else {
        const errorText = await response.text();
        setError('Failed to fetch max questions: ' + errorText);
      }
    } catch (err) {
      console.error('Error fetching max questions:', err);
      setError('Error fetching max questions: ' + err.message);
    }
  };

  const handleSubmit = async () => {
    if (!file || !questionType || !numQuestions) {
      setError('Please upload a file and select all fields.');
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      setError('Email is required. Please log in again.');
      return;
    }

    setLoading(true); // Set loading state to true while submitting

    const formData = new FormData();
    formData.append('file', file);
    formData.append('questionType', questionType);
    formData.append('numQuestions', numQuestions);
    formData.append('email', email);

    try {
      const response = await fetch('http://localhost:5001/api/upload-and-generate-questions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
        setError('');
      } else {
        const errorText = await response.text();
        setError('Failed to fetch questions: ' + errorText);
      }
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Error generating questions: ' + err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
    const questionWords = ['what', 'why', 'where', 'how', 'who', 'when'];
    let formattedQuestion = questionText.charAt(0).toUpperCase() + questionText.slice(1);

    const startsWithQuestionWord = questionWords.some(word => formattedQuestion.toLowerCase().startsWith(word));

    if (startsWithQuestionWord && !formattedQuestion.endsWith('?')) {
      formattedQuestion = formattedQuestion + ' ?';
    } else if (!formattedQuestion.endsWith('?')) {
      formattedQuestion = formattedQuestion + ' .';
    }

    return formattedQuestion;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <section style={{ flex: 1, paddingTop: '120px' }}>
        <h5 style={{ marginBottom: '0px', textAlign: 'center' }}>
          Welcome to Quiz Master! Let's make learning fun and exciting!
        </h5>
        <div style={styles.formContainer}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <select
            style={styles.dropdown}
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            disabled={!maxQuestions}
          >
            <option value="">Select Number of Questions</option>
            {Array.from({ length: maxQuestions }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <select
            style={styles.dropdown}
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="">Select Question Type</option>
            <option value="mcq">MCQ's</option>
            <option value="short_qa">Short Answers</option>
          </select>
          <button
            style={styles.submitButton}
            onClick={handleSubmit}
            disabled={!file || !questionType || !numQuestions || loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p style={styles.errorText} aria-live="assertive">{error}</p>}
        </div>

        <hr style={styles.blackLine} />

        <h5 style={{ marginBottom: '10px', textAlign: 'center', color: '#333' }}>
          Generated Questions on Uploaded Document
        </h5>
        <div style={styles.container}>
          {loading ? (
            <div style={styles.loadingText}>Loading...</div>
          ) : questions.length === 0 ? (
            <p style={styles.noQuestionsText}>No questions to display.</p>
          ) : (
            <div style={styles.questionItem}>
              <p style={styles.questionText}>
                <strong>Q{currentQuestionIndex + 1}:</strong> {formatQuestion(questions[currentQuestionIndex].question)}
              </p>
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
                <p style={styles.answerText}>
                  <strong>Answer:</strong> {questions[currentQuestionIndex].answer}
                </p>
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
    width: '230px',
  },
  submitButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '120px',
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
    // height: '400px',
    // overflowY: 'auto',
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
    justifyContent: 'center',
    gap: '20px',
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
  errorText: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '10px',
  },
};

export default Cquiz;
