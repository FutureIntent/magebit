import React, { createContext } from 'react';

export const URLContext = createContext();

export const URLContextProvider = (props) => {

    const BackEnd_URL = 'http://83.177.140.69:3001';

    return (
        <URLContext.Provider value={BackEnd_URL}>
         { props.children }
        </URLContext.Provider>
        );
}