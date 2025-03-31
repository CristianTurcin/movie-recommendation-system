import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';

const AnimatedQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, Q3: value }));
        navigate(value === 1 ? '/recommend/animation' : '/romance');
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.overlay}>
                <h2 style={styles.question}>
                    🎨 Do you enjoy movies that are animated?
                </h2>
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
        backgroundImage: 'url("/images/animation.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        transition: 'background-image 0s ease-in-out', // remove fade
    },
    overlay: {
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '7vh',
        paddingInline: '1rem',
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

export default AnimatedQuestions;
