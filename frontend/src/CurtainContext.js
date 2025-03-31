// src/CurtainContext.js
import React, { createContext, useState } from 'react';

export const CurtainContext = createContext();

export const CurtainProvider = ({ children }) => {
    const [showCurtain, setShowCurtain] = useState(false);
    const [nextRoute, setNextRoute] = useState('');
    const [curtainDuration, setCurtainDuration] = useState(1);

    return (
        <CurtainContext.Provider value={{
            showCurtain,
            setShowCurtain,
            nextRoute,
            setNextRoute,
            curtainDuration,
            setCurtainDuration
        }}>
            {children}
        </CurtainContext.Provider>
    );
};
