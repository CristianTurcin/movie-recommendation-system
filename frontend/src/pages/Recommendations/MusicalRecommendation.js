import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../AnswerContext';

const MusicalRecommendation = () => {
    const { answers, filters, resetAnswers, resetFilters } = useContext(AnswerContext);
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("🎵 [MusicalRecommendation] useEffect triggered");
        console.log("🧠 Answers before request:", answers);
        console.log("🎛 Filters before request:", filters);

        if (!('Q1' in answers)) {
            console.warn("⚠️ Q1 is missing. You might not have saved the first mood selection.");
        }
        if (!('Q2' in answers)) {
            console.warn("⚠️ Q2 is missing. Musical preference may not be set.");
        }

        const fetchRecommendation = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recommend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers, filters })
                });

                console.log("📡 Fetch response status:", response.status);
                const data = await response.json();
                console.log("🎬 Data received from backend:", data);

                if (data.movie || data.movies) {
                    setMovie(data.movie || data.movies[0]);
                } else {
                    setError(data.message || 'No recommendation found.');
                }
            } catch (err) {
                console.error("❌ Error during fetch:", err);
                setError("Error fetching recommendation.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    }, [answers, filters]);

    const handleResetAndGoHome = () => {
        resetAnswers();
        resetFilters();
        navigate('/');
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <p>Loading recommendation...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <h2>{error}</h2>
                <button onClick={handleResetAndGoHome}>Start Over</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1>🎬 Your Musical Movie Recommendation</h1>
            <h2>{movie.title} ({movie.year})</h2>
            <p><strong>Rating:</strong> {movie.rating ? movie.rating : 'Unknown'}</p>
            <p><strong>Duration:</strong> {movie.duration ? `${movie.duration} minutes` : 'Unknown'}</p>
            <p><strong>Language:</strong> {movie.language || 'Unknown'}</p>
            {movie.poster && (
                <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    style={styles.poster}
                />
            )}
            <p><strong>Description:</strong> {movie.description}</p>
            <button onClick={handleResetAndGoHome} style={styles.button}>
                Choose Another Movie
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#2a2a2a', // 🍿 dark cinema vibe
        color: 'white'
    },
    poster: {
        marginTop: '1rem',
        maxWidth: '300px',
        borderRadius: '8px'
    },
    button: {
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};

export default MusicalRecommendation;
