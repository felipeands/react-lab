import React, { useState } from 'react';

export const Contexto = React.createContext([{}, () => { }]);
export const ContextoProvider = (props) => {
    const [state, setState] = useState({});

    return (
        <Contexto.Provider value={[state, setState]}>
            {props.children}
        </Contexto.Provider>
    )
}