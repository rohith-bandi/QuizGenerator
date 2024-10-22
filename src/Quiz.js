import React from 'react';
import Header from './components/header';
import Footer from './components/footer';

const Quiz = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <section style={{ flex: 1, padding: '0', paddingTop: '6%' }}>
                <div style={styles.formContainer}>
                    <select style={styles.dropdown}>
                        <option value="">Select Topic</option>
                        <option value="option1">Python</option>
                        <option value="option2">CPP</option>
                        <option value="option3">Java</option>
                        <option value="option4">JavaScript</option>
                    </select>
                    <select style={styles.dropdown}>
                        <option value="">Type of Question</option>
                        <option value="option1">MCQ's</option>
                        <option value="option2">Booleans</option>
                        <option value="option3">Short Answers</option>
                        <option value="option4">Fill in the blanks</option>
                    </select>
                    <select style={styles.dropdown}>
                        <option value="">No. of Questions</option>
                        <option value="option1">1</option>
                        <option value="option2">2</option>
                        <option value="option3">3</option>
                        <option value="option4">4</option>
                        <option value="option5">5</option>
                    </select>
                    {/* <select style={styles.dropdown}>
                        <option value="">Difficulty</option>
                        <option value="option1">Easy</option>
                        <option value="option2">Medium</option>
                        <option value="option3">Hard</option>
                    </select> */}
                    <button style={styles.submitButton}>Submit</button>
                </div>
                <hr style={styles.blackLine} />
            </section>
            <Footer />
        </div>
    );
};

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'row', // Keep items in a row for larger screens
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '55%',
        margin: 'auto',
        marginTop: '20px',
        flexWrap: 'wrap', // For responsive behavior
    },
    dropdown: {
        marginRight: '10px',
        marginBottom: '10px', // Add spacing for smaller screens
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: '1 1 200px', // Flex item width to fit within the container
    },
    submitButton: {
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        flex: '1 1 auto', // Let the button flex based on available space
    },
    blackLine: {
        border: 'none',
        borderTop: '2px solid black',
        width: '80%',
        margin: '20px auto', // Center the black line
    },
    // Media queries for different screen sizes
    '@media (max-width: 768px)': {
        formContainer: {
            flexDirection: 'column', // Stack form elements vertically on smaller screens
            maxWidth: '90%', // Expand container width on smaller screens
            marginTop:'20px'
        },
        dropdown: {
            flex: '1 1 100%', // Make dropdowns take full width
            marginBottom: '15px', // Add spacing for each dropdown
        },
        submitButton: {
            width: '100%', // Make the button full-width on smaller screens
            marginTop: '15px',
        },
    },
};

export default Quiz;
