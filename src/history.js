import React from 'react';
import Header from './components/header';
import Footer from './components/footer';

const History = () => {
    return (
        <div style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
            <Header />
            <section style={{flex:1,padding:'0',paddingTop:'6%' }}>
                <h4 style={styles.formContainer}>Start Writting QUIZZZZZZ!</h4>
            </section>
            <Footer />
        </div>
    );
}

const styles = {
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '3px solid #ccc',
        borderRadius: '5px',
        minHeight: '59vh',
        maxWidth: '55%',
        // margin: 'auto',
        marginTop: '20px',
        marginLeft: '22%',
    },
}
export default History;
