import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';

const RomanceQuestions = () => {
    const { answers, setAnswers } = useContext(AnswerContext);
    const navigate = useNavigate();

    const handleAnswer = async (value) => {
        const updatedAnswers = { ...answers, Q4: value };
        setAnswers(updatedAnswers);

        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: updatedAnswers, filters: {} })
            });

            const data = await response.json();
            const route = value === 1 ? '/recommend/romance' : '/recommend/comedy';

            if (data.movie) {
                navigate(route, { state: { movie: data.movie } });
            } else {
                alert(data.message || 'No recommendation available.');
            }
        } catch (err) {
            console.error(err);
            alert('Error fetching recommendation.');
        }
    };

    return (
        <div style={styles.wrapper}>
            <img src="/images/romance5.jpg" alt="Romantic scene" style={styles.backgroundImage} />

            <div style={styles.overlay}>
                <h2 style={styles.question}>💕 Are you interested in a movie that focuses on the development of a romantic relationship between two characters?</h2>
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
        objectPosition: 'center top', // ✅ starts image from top without shifting
        zIndex: 1,
    },
    overlay: {
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingInline: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // optional for contrast
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
            transform: 'translateX(250px)', // 👈 shift buttons to the right
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





export default RomanceQuestions;
