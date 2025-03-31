// src/pages/SeriousFlow/FlashbackQuestions.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/FlashbackQuestions.css';

function FlashbackQuestions() {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, Q10: value }));
        navigate(value === 1 ? '/recommend/biography' : '/recommend/drama');
    };

    return (
        <div className="flashback-wrapper">
            <div className="flashback-content">
                <h1>Does the movie you would like to watch use flashbacks or other techniques to explore the character's past?</h1>
                <div className="flashback-buttons">
                    <button onClick={() => handleAnswer(1)}>Yes</button>
                    <button onClick={() => handleAnswer(0)}>No</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem'
    },
    buttonContainer: {
        marginTop: '2rem'
    },
    button: {
        margin: '0 1rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};

export default FlashbackQuestions;
