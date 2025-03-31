import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/RealismQuestions.css';

const RealismQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = async (value) => {
        const updatedAnswers = { ...answers, Q6: value };
        setAnswers(updatedAnswers);

        if (value === 1) {
            // Realistic → Try to recommend Action movie
            try {
                const response = await fetch('http://localhost:5000/api/recommend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: updatedAnswers, filters: {} })
                });

                const data = await response.json();

                if (data.movie) {
                    navigate('/recommend/action', { state: { movie: data.movie } });
                } else {
                    alert(data.message || 'No recommendation available.');
                }
            } catch (err) {
                console.error(err);
                alert('Error fetching recommendation.');
            }
        } else {
            // Fantastical → Go to Scary question
            navigate('/scary');
        }
    };

    return (
        <div className="question-container">
            <div className="realism-content">
                <h1>Do you want the storyline to be more realistic and plausible or more fantastical and reliant on
                    suspension of disbelief?</h1>
                <button onClick={() => handleAnswer(1)}>Realistic and Plausible</button>
                <button onClick={() => handleAnswer(0)}>Fantastical and Reliant on Suspension</button>
            </div>
        </div>
            );
            };

            export default RealismQuestions;
