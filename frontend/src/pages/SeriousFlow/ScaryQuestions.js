import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/ScaryQuestions.css';

const ScaryQuestions = () => {
    const navigate = useNavigate();
    const { answers, setAnswers } = useContext(AnswerContext);

    const handleAnswer = (value) => {
        const updatedAnswers = { ...answers, Q7: value };
        setAnswers(updatedAnswers);

        if (value === 1) {
            navigate('/jump-style');
        } else {
            navigate('/recommend/thriller');
        }
    };

    return (
        <div className="scary-wrapper">
            <div className="scary-content">
                <h2>Do you like movies that are meant to scare you?</h2>
                <div className="scary-buttons">
                    <button onClick={() => handleAnswer(1)}>Yes</button>
                    <button onClick={() => handleAnswer(0)}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ScaryQuestions;