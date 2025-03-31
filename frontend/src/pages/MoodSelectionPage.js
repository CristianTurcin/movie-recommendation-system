import React, { useContext, useRef } from 'react';
import { AnswerContext } from '../AnswerContext';
import { CurtainContext } from '../CurtainContext';
import '../styles/MoodSelectionPage.css';

function MoodSelectionPage() {
    const { answers, setAnswers, filters, setFilters } = useContext(AnswerContext);
    const {
        setShowCurtain,
        setNextRoute,
        setCurtainDuration
    } = useContext(CurtainContext);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleMoodSelect = (mood) => {
        const updatedAnswers = {
            ...answers,
            Q1: mood === 'comedy' ? 1 : 0,
        };
        setAnswers(updatedAnswers);

        const destination = mood === 'comedy' ? '/musical' : '/storytelling';
        setNextRoute(destination);

        const curtainAudio = new Audio('/sounds/curtain.mp3');
        curtainAudio.volume = 0.7;

        curtainAudio.onloadedmetadata = () => {
            const duration = curtainAudio.duration || 23; // fallback to 23s if duration is undetectable
            setCurtainDuration(duration);
            curtainAudio.play().catch(err => console.warn("Audio playback blocked:", err));
            setShowCurtain(true);
        };

        curtainAudio.load(); // Trigger loading to ensure metadata fires
    };


    return (
        <div className="mood-selection">
            <h1 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: '#C21807', // ✨ Golden yellow for cinematic glow
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
            }}>

                🎛 Answer a few filters before selecting your mood
            </h1>
            <div className="form-container">
                <div className="filters">
                    <label>
                        🎟️ What is the age restriction?
                        <select name="ageRestriction" value={filters.ageRestriction} onChange={handleFilterChange}>
                            <option value="">-- Select --</option>
                            <option value=">=17">>=17</option>
                            <option value="<17">&lt;17</option>
                        </select>
                    </label>
                    <label>
                        📅 When has the movie been released?
                        <select name="releaseYear" value={filters.releaseYear} onChange={handleFilterChange}>
                            <option value="">-- Select --</option>
                            <option value=">=2000">>=2000</option>
                            <option value="<2000">&lt;2000</option>
                        </select>
                    </label>
                    <label>
                        ⭐ What rating category would you like?
                        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
                            <option value="">-- Select --</option>
                            <option value=">=6">>=6</option>
                            <option value=">=8">>=8</option>
                        </select>
                    </label>
                    <label>
                        ⏱️ How long should the movie be?
                        <select name="runtime" value={filters.runtime} onChange={handleFilterChange}>
                            <option value="">-- Select --</option>
                            <option value="<120">&lt;120 min</option>
                            <option value=">=120">>=120 min</option>
                        </select>
                    </label>
                    <label>
                        🌐 Language the movie is dubbed in:
                        <select name="language" value={filters.language} onChange={handleFilterChange}>
                            <option value="">-- Select --</option>
                            <option value="English">English</option>
                            <option value="German">German</option>
                        </select>
                    </label>
                </div>

                <div className="mood-buttons">
                    <h2>🎭 Now select your mood:</h2>
                    <button onClick={() => handleMoodSelect('comedy')}>Lighthearted and Comedic</button>
                    <button onClick={() => handleMoodSelect('drama')}>Serious and Dramatic</button>
                </div>
            </div>
            </div>
            );
            }

            export default MoodSelectionPage;
