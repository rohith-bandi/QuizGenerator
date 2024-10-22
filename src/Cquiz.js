import React from 'react';
import Header from './components/header';
import Footer from './components/footer';

const Cquiz = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <section style={{ flex: 1, padding: '0', paddingTop: '6%' }}>
                <div style={styles.formContainer}>
                    <textarea className="form-control" id="message" required placeholder="Enter Data" style={{ height: '100px' }}></textarea>
                    <input type="file" id="file-upload" style={styles.fileInput} accept="application/pdf" />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align items to the right
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '45%',
        margin: 'auto',
        marginTop: '20px',
        flexWrap: 'wrap',
    },
    fileInput: {
        marginRight: '10px',
        // marginBottom: '10px',
        marginTop: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: '1 1 150px',
    },
    submitButton: {
        padding: '8px',
        marginTop: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        maxWidth: '100px',
        flex: '1 1 auto',
    },
    blackLine: {
        border: 'none',
        borderTop: '2px solid black',
        width: '80%',
        margin: '20px auto',
    },
    '@media (max-width: 768px)': {
        formContainer: {
            flexDirection: 'column',
            maxWidth: '90%',
            marginTop: '20px',
        },
        fileInput: {
            flex: '1 1 100%',
            marginBottom: '15px',
        },
        submitButton: {
            width: '100%',
            marginTop: '15px',
        },
    },
};

export default Cquiz;
