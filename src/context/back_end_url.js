import React, { createContext } from 'react';

export const URLContext = createContext();

export const URLContextProvider = (props) => {

    const BackEnd_URL = 'http://94.186.64.225:3001';

    return (
        <URLContext.Provider value={BackEnd_URL}>
         { props.children }
        </URLContext.Provider>
        );
}