import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';

const ComedyQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = async (value) => {
        const updatedAnswers = { ...answers, Q10: value };
        setAnswers(prev => ({ ...prev, Q10: value }));

        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: updatedAnswers, filters: {} })
            });

            const data = await response.json();

            if (data.movie) {
                navigate('/recommend/comedy', { state: { movie: data.movie } });
            } else {
                alert(data.message || 'No recommendation available.');
            }
        } catch (err) {
            console.error(err);
            alert('Error fetching recommendation.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Does the movie explore the character's past (e.g., through flashbacks)?</h2>
            <div style={styles.buttonContainer}>
                <button onClick={() => handleAnswer(1)} style={styles.button}>Yes</button>
                <button onClick={() => handleAnswer(0)} style={styles.button}>No</button>
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
        marginTop: '1.5rem',
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

export default ComedyQuestions;
