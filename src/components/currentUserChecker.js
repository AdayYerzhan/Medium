import {useContext, useEffect} from "react";
import useFetch from "hooks/useFetch";
import {CurrentUserContext} from "constexts/currentUser";
import useLocalStorage from "hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch("/user");
    const [, setCurrentUserState] = useContext(CurrentUserContext);
    const [token] = useLocalStorage("tokenMedium");

    useEffect(() => {
        if (!token) return;

        doFetch();
        setCurrentUserState(state => ({
            ...state,
            isLoading: true
        }))
    }, [doFetch, setCurrentUserState, token]);

    useEffect(() => {
        if (!response) return;

        setCurrentUserState(state => ({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            currentUser: response.user,
        }))
    }, [response, setCurrentUserState]);

    return children;
}

export default CurrentUserChecker;