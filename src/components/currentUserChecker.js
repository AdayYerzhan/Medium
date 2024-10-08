import {useContext, useEffect} from "react";
import useFetch from "hooks/useFetch";
import {CurrentUserContext} from "constexts/currentUser";
import useLocalStorage from "hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch("/user");
    const [, dispatch] = useContext(CurrentUserContext);
    const [token] = useLocalStorage("tokenMedium");

    useEffect(() => {
        if (!token) {
            dispatch({ type: "SET_UNAUTHORIZED" });
            return;
        }

        doFetch();
        dispatch({ type: "LOADING" });
    }, [doFetch, dispatch, token]);

    useEffect(() => {
        if (!response) return;

        dispatch({type: "SET_AUTHORIZED", payload: response.user});
    }, [response, dispatch]);

    return children;
}

export default CurrentUserChecker;