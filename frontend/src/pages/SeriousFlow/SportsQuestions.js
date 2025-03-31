import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';
import '../../styles/SportsQuestions.css';

const SportsQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = async (value) => {
        const updatedAnswers = { ...answers, Q9: value };
        setAnswers(updatedAnswers);

        if (value === 1) {
            // YES → Sport recommendation
            try {
                const response = await fetch('http://localhost:5000/api/recommend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: updatedAnswers, filters: {} })
                });

                const data = await response.json();

                if (data.movie) {
                    navigate('/recommend/sport', { state: { movie: data.movie } });
                } else {
                    alert(data.message || 'No recommendation available.');
                }
            } catch (err) {
                console.error(err);
                alert('Error fetching recommendation.');
            }
        } else {
            // NO → Go to Q10 (Flashback)
            navigate('/flashback');
        }
    };

    return (
        <div className="sports-wrapper">
            <div className="sports-overlay">
                <h2>Do you prefer movies that center around sports and athletic competitions over movies that explore other types of activities and hobbies?</h2>
                <div style={styles.buttonContainer}>
                    <button onClick={() => handleAnswer(1)} style={styles.button}>Yes</button>
                    <button onClick={() => handleAnswer(0)} style={styles.button}>No</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1rem'
    },
    buttonContainer: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem',
        cursor: 'pointer'
    }
};

export default SportsQuestions;
