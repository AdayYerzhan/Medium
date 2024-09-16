import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "hooks/useFetch";
import ArticleForm from "components/articleForm";
import {CurrentUserContext} from "constexts/currentUser";

const EditArticle = () => {
    const slug = useParams().slug
    const navigate = useNavigate()
    const [currentUserState] = useContext(CurrentUserContext);
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [
        {response: updateArticleResponse, error: updateArticleError},
        doUpdateArticle
    ] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    const handleSubmit = article => {
        console.log("handleSubmit", article)
        doUpdateArticle({
            method: "PUT",
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }

        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList,
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }

        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return navigate("/")
    }

    if (isSuccessfullSubmit) {
        return navigate(`/articles/${slug}`)
    }

    return (
        <ArticleForm
            onSubmit={handleSubmit}
            error={(updateArticleError && updateArticleError.error) || {}}
            initialValues={initialValues}
        />
    )
}

export default EditArticle;