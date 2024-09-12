import axios from "axios";
import {useEffect, useState} from "react";

const useFetch = (url) => {
    const baseUrl = "https://conduit.productionready.io/api";
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});

    const doFetch = (options = {}) => {
        setOptions(options);
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) return;

        axios(baseUrl + url, options)
            .then(res => {
                console.log("success", res);
                setResponse(res.data);
            })
            .catch(err => {
                console.log("error", err);
                setError(err.response.data);
            })
            .finally(() => setIsLoading(false));
        }, [isLoading, options, url]);

    return [{ response, isLoading, error }, doFetch];
}
export default useFetch;