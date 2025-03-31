import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/StorytellingQuestions.css'; // Follow same CSS pattern

const StorytellingQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = (value) => {
        const updatedAnswers = { ...answers, Q5: value };
        setAnswers(updatedAnswers);
        navigate(value === 1 ? '/realism' : '/sports');
    };

    return (
        <div className="storytelling-wrapper">
            <div
                className="storytelling-overlay"
                style={{ marginTop: '59vh' }} // 👈 Pushes content lower
            >
                <h2>Is strong storytelling more important than character development for you when it comes to a movie?</h2>
                <div style={styles.buttonContainer
                }>
                    <button onClick={() => handleAnswer(1)} style={styles.button}>Yes</button>
                    <button onClick={() => handleAnswer(0)} style={styles.button}>No</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    buttonContainer: {
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
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

export default StorytellingQuestions;
