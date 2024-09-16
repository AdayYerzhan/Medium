import React, {useContext, useEffect, useState} from "react";

import ArticleForm from "components/articleForm";
import useFetch from "hooks/useFetch";
import {useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../constexts/currentUser";

const CreateArticle = () => {
    const apiUrl = "/articles";
    const [{response, error}, doFetch] = useFetch(apiUrl);
    const [currentUserState] = useContext(CurrentUserContext);
    const errors = {}
    const intialValues = {
        title: "Basic",
        description: "",
        body: "",
        tagList: ["11", "22", "33"]
    }
    const [isSuccessFullSubmint, setIsSuccessFullSubmint] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (article) => {
        console.log("handleSubmit", article)
        doFetch({
            method: "POST",
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) return;

        setIsSuccessFullSubmint(true);
    }, [response]);

    if (currentUserState.isLoading === false) {
        return navigate("/");
    }

    if (isSuccessFullSubmint) {
        return navigate(`/articles/${response.article.slug}`);
    }

    return (
        <ArticleForm
            errors={(error && error.errors) || {}}
            onSubmit={handleSubmit}
            initialValues={intialValues}
        />
    )
}

export default CreateArticle;