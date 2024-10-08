import { createContext, useContext, useState, useEffect } from 'react';
import useMind from '../hooks/useMind';

const MindContext = createContext();

export const MindProvider = ({ contractAddress, children }) => {
    const mind = useMind(contractAddress);

    return <MindContext.Provider value={mind}>{children}</MindContext.Provider>;
};

export const useMindContext = () => {
    return useContext(MindContext);
};
