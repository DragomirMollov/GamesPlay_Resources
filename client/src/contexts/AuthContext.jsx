/* eslint-disable style/jsx-indent */
/* eslint-disable style/padded-blocks */
/* eslint-disable style/indent */
import { createContext, useContext, useState } from 'react';

import usePersisterdState from '../hooks/usePersistedState';

export const AuthContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null,
});

export function AuthContextProvider(props) {
    const [authState, setAuthState] = usePersisterdState('auth', {});

    const changeAuthState = (state) => {

        setAuthState(state);
    };

    const logout = () => {
        setAuthState(null);
    };

    const contextData = {
        userId: authState?._id,
        email: authState?.email,
        accessToken: authState?.accessToken,
        isAuthenticated: !!authState?.email,
        changeAuthState,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};


export function useAuthContext() {
    const authData = useContext(AuthContext);

    return authData;
};