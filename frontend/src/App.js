import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnswerProvider } from './AnswerContext';

import { CurtainProvider } from './CurtainContext';
import CurtainOverlay from './components/CurtainOverlay';


import MoodSelectionPage from './pages/MoodSelectionPage';
import MusicalQuestions from './pages/LightheartedFlow/MusicalQuestions';
import AnimatedQuestions from './pages/LightheartedFlow/AnimatedQuestions';
import RomanceQuestions from './pages/LightheartedFlow/RomanceQuestions';
import ComedyQuestions from './pages/LightheartedFlow/ComedyQuestions';

import StorytellingQuestions from './pages/SeriousFlow/StorytellingQuestions';
import RealismQuestions from './pages/SeriousFlow/RealismQuestions';
import ScaryQuestions from './pages/SeriousFlow/ScaryQuestions';
import ScareTypeQuestions from './pages/SeriousFlow/ScareTypeQuestions';
import SportsQuestions from './pages/SeriousFlow/SportsQuestions';
import FlashbackQuestions from './pages/SeriousFlow/FlashbackQuestions';

import MusicalRecommendation from './pages/Recommendations/MusicalRecommendation';
import AnimationRecommendation from './pages/Recommendations/AnimationRecommendation';
import RomanceRecommendation from './pages/Recommendations/RomanceRecommendation';
import ComedyRecommendation from './pages/Recommendations/ComedyRecommendation';
import ActionRecommendation from './pages/Recommendations/ActionRecommendation';
import SciFiRecommendation from './pages/Recommendations/SciFiRecommendation';
import HorrorRecommendation from './pages/Recommendations/HorrorRecommendation';
import ThrillerRecommendation from './pages/Recommendations/ThrillerRecommendation';
import SportRecommendation from './pages/Recommendations/SportRecommendation';
import BiographyRecommendation from './pages/Recommendations/BiographyRecommendation';
import DramaRecommendation from './pages/Recommendations/DramaRecommendation';

function App() {
    return (
        <CurtainProvider>
            <AnswerProvider>
                <Router>
                    <CurtainOverlay /> {/* 👈 global animated curtain */}
                    <Routes>
                        <Route path="/" element={<MoodSelectionPage />} />
                        <Route path="/musical" element={<MusicalQuestions />} />
                        <Route path="/animated" element={<AnimatedQuestions />} />
                        <Route path="/romance" element={<RomanceQuestions />} />
                        <Route path="/comedy" element={<ComedyQuestions />} />

                        <Route path="/storytelling" element={<StorytellingQuestions />} />
                        <Route path="/realism" element={<RealismQuestions />} />
                        <Route path="/scary" element={<ScaryQuestions />} />
                        <Route path="/jump-style" element={<ScareTypeQuestions />} />
                        <Route path="/sports" element={<SportsQuestions />} />
                        <Route path="/flashback" element={<FlashbackQuestions />} />

                        <Route path="/recommend/musical" element={<MusicalRecommendation />} />
                        <Route path="/recommend/animation" element={<AnimationRecommendation />} />
                        <Route path="/recommend/romance" element={<RomanceRecommendation />} />
                        <Route path="/recommend/comedy" element={<ComedyRecommendation />} />
                        <Route path="/recommend/action" element={<ActionRecommendation />} />
                        <Route path="/recommend/scifi" element={<SciFiRecommendation />} />
                        <Route path="/recommend/horror" element={<HorrorRecommendation />} />
                        <Route path="/recommend/thriller" element={<ThrillerRecommendation />} />
                        <Route path="/recommend/sport" element={<SportRecommendation />} />
                        <Route path="/recommend/biography" element={<BiographyRecommendation />} />
                        <Route path="/recommend/drama" element={<DramaRecommendation />} />
                    </Routes>
                </Router>
            </AnswerProvider>
        </CurtainProvider>
    );
}


export default App;
