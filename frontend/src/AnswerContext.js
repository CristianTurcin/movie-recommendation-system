import React, { createContext, useState } from 'react';

export const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
    const [answers, setAnswers] = useState({});
    const [filters, setFilters] = useState({
        ageRestriction: '',
        releaseYear: '',
        rating: '',
        runtime: '',
        language: ''
    });

    const resetAnswers = () => setAnswers({});
    const resetFilters = () => setFilters({
        ageRestriction: '',
        releaseYear: '',
        rating: '',
        runtime: '',
        language: ''
    });

    return (
        <AnswerContext.Provider value={{ answers, setAnswers, filters, setFilters, resetAnswers, resetFilters }}>
            {children}
        </AnswerContext.Provider>
    );
};
