import React, {createContext, useReducer} from "react";

const initialState = {
    isLoading: false,
    isLoggedIn: null,
    currentUser: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true };
        case "SET_AUTHORIZED":
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                currentUser: action.payload
            }
        case "SET_UNAUTHORIZED":
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
            };
        default:
            return state;
    }
}

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }) => {
    const value = useReducer(reducer, initialState);

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}