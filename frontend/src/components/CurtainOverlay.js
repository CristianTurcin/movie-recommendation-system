// src/components/CurtainOverlay.js
import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurtainContext } from '../CurtainContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CurtainOverlay.css';

const CurtainOverlay = () => {
    const {
        showCurtain,
        setShowCurtain,
        nextRoute,
        setNextRoute,
        curtainDuration
    } = useContext(CurtainContext);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (showCurtain && nextRoute && location.pathname !== nextRoute) {
            navigate(nextRoute);
        }
    }, [showCurtain, nextRoute, location, navigate]);

    const handleCurtainEnd = () => {
        setShowCurtain(false);
        setNextRoute('');
    };

    return (
        <AnimatePresence>
            {showCurtain && (
                <>
                    <motion.div
                        className="curtain curtain-left"
                        initial={{ x: 0 }}
                        animate={{ x: '-100%' }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: curtainDuration, ease: 'easeInOut' }}
                        onAnimationComplete={handleCurtainEnd}
                    />
                    <motion.div
                        className="curtain curtain-right"
                        initial={{ x: 0 }}
                        animate={{ x: '100%' }}
                        exit={{ x: '100%' }}
                        transition={{ duration: curtainDuration, ease: 'easeInOut' }}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default CurtainOverlay;
