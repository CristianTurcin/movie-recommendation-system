import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/ScareTypeQuestions.css'; // ✅ import CSS

const ScareTypeQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = (answer) => {
        const updatedAnswers = { ...answers, Q8: answer };
        console.log("Q8 Answer:", updatedAnswers);
        setAnswers(updatedAnswers);

        if (answer === 1) {
            navigate('/recommend/horror');
        } else {
            navigate('/recommend/thriller');
        }
    };

    return (
        <div className="scare-type-wrapper">
            <div style={{ transform: 'translateY(+7rem)', textAlign: 'center' }}>
                <h2>Are you in the mood for movies that rely more on jump scares or movies that rely more on suspenseful tension and psychological elements?</h2>
                <button onClick={() => handleAnswer(1)}>Jump scares</button>
                <button onClick={() => handleAnswer(0)}>Suspenseful and psychological</button>
            </div>
        </div>
    );
};

export default ScareTypeQuestions;