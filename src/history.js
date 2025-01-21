import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";

const History = () => {
  const [pdfHistory, setPdfHistory] = useState([]);
  const [nonPdfHistory, setNonPdfHistory] = useState([]);
  const [expandedPdf, setExpandedPdf] = useState({});
  const [expandedNonPdf, setExpandedNonPdf] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) {
          setError("No email found. User is not authenticated.");
          return;
        }

        const response = await fetch("http://localhost:5001/api/submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || response.statusText);
          return;
        }

        const data = await response.json();

        if (data.submissions && Array.isArray(data.submissions)) {
          const pdfData = data.submissions
            .filter((submission) => submission.sourceType === "pdf")
            .reverse();
          const nonPdfData = data.submissions
            .filter((submission) => submission.sourceType === "non-pdf")
            .reverse();

          setPdfHistory(pdfData);
          setNonPdfHistory(nonPdfData);
        } else {
          setError("No submissions found.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("An error occurred while fetching history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleExpand = (type, index) => {
    if (type === "pdf") {
      setExpandedPdf((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    } else if (type === "nonPdf") {
      setExpandedNonPdf((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column",}}
    >
      <Header />
      <section style={{ paddingBottom: "0px" }}>
        <div style={styles.formContainer}>
          <div style={styles.historyWrapper}>
            <div style={styles.box}>
              <h3 style={styles.subheading}>Quiz History</h3>
              <div style={styles.scrollableContent}>
                {nonPdfHistory.length > 0 ? (
                  nonPdfHistory.map((submission, index) => (
                    <div key={index} style={styles.submissionBox}>
                      <div
                        style={styles.toggleHeader}
                        onClick={() => toggleExpand("nonPdf", index)}
                      >
                        <h4>Topic: {submission.subTopic}</h4>
                        <span style={styles.toggleSymbol}>
                          {expandedNonPdf[index] ? "-" : "+"}
                        </span>
                      </div>
                      {expandedNonPdf[index] && (
                        <ul style={styles.questionsList}>
                          {submission.questions.map((q, idx) => (
                            <li key={idx} style={styles.questionItem}>
                              <p>
                                <b>Question:</b> {q.question || "No question available"}
                              </p>
                              {q.options && q.options.length > 0 && (
                                <div>
                                  <b>Options:</b>
                                  <ul>
                                    {q.options.map((option, optionIdx) => (
                                      <li key={optionIdx}>{option}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              <p>
                                <b>Answer:</b> {q.answer || "No answer available"}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No Non-PDF submissions found.</p>
                )}
              </div>
            </div>
            <div style={styles.box}>
              <h3 style={styles.subheading}>Custom-Quiz History</h3>
              <div style={styles.scrollableContent}>
                {pdfHistory.length > 0 ? (
                  pdfHistory.map((submission, index) => (
                    <div key={index} style={styles.submissionBox}>
                      <div
                        style={styles.toggleHeader}
                        onClick={() => toggleExpand("pdf", index)}
                      >
                        <h4>QType: {submission.questionType}</h4>
                        <span style={styles.toggleSymbol}>
                          {expandedPdf[index] ? "-" : "+"}
                        </span>
                      </div>
                      {expandedPdf[index] && (
                        <ul style={styles.questionsList}>
                          {submission.questions.map((q, idx) => (
                            <li key={idx} style={styles.questionItem}>
                              <p>
                                <b>Question:</b> {q.question}
                              </p>
                              {q.options && q.options.length > 0 && (
                                <div>
                                  <b>Options:</b>
                                  <ul>
                                    {q.options.map((option, optionIdx) => (
                                      <li key={optionIdx}>{option}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              <p>
                                <b>Answer:</b> {q.answer}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No PDF submissions found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
    formContainer: {
      padding: "35px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    historyWrapper: {
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      gap: "20px",
    },
    box: {
      flex: 1,
      border: "2px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      height: '500px', // Fixed height for the box itself
      height: "58vh", // Maximum height for the box
      display: "flex",
      flexDirection: "column", // Ensures proper layout for scrolling
    },
    subheading: {
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    scrollableContent: {
      flex: 1, // Ensures the scrollable area fills the available space
      overflowY: "auto", // Enables vertical scrolling
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#fff",
    },
    submissionBox: {
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    },
    toggleHeader: {
      display: "flex",
      justifyContent: "space-between",
      cursor: "pointer",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    toggleSymbol: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    questionsList: {
      listStyleType: "none",
      paddingLeft: "10px",
      marginTop: "10px",
    },
    questionItem: {
      marginBottom: "10px",
    },
  };

  export default History;