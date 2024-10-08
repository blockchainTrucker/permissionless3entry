// MindContext.jsx
import React, { createContext } from 'react';
import useMind from '../hooks/useMind'; // Import the custom hook

// Create the Context
export const MindContext = createContext();

// Provider component to manage the contract interaction and provide it through context
export const MindProvider = ({ contractAddress, children }) => {
    // Use the custom useMind hook to get contract interaction logic
    const mind = useMind(contractAddress);

    return <MindContext.Provider value={mind}>{children}</MindContext.Provider>;
};
