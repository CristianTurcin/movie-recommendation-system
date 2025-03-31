import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';

const MusicalQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, Q2: value }));

        if (value === 0) {
            navigate('/animated');
        } else {
            navigate('/recommend/musical');
        }
    };

    return (
        <div style={styles.wrapper}>
            <img src="/images/musical.jpg" alt="Musical theme" style={styles.backgroundImage}/>

            <div style={styles.overlay}>
                <h2 style={styles.question}>🎤 Do you prefer movies with a lot of musical numbers?</h2>
                <div style={styles.buttonContainer}>
                    <button onClick={() => handleAnswer(1)} style={styles.button}>Yes</button>
                    <button onClick={() => handleAnswer(0)} style={styles.button}>No</button>
                </div>
            </div>
        </div>

    );


};

const styles = {
    wrapper: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1,
    },
    overlay: {
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // move content to top-ish
        alignItems: 'center',
        paddingTop: '2vh', // adjust this to move it higher or lower
        paddingHorizontal: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        textAlign: 'center',
    },
    question: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#ff5252',
        color: '#fff',
        cursor: 'pointer',
    },
};


export default MusicalQuestions;
