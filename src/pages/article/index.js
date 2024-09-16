import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import useFetch from "hooks/useFetch";
import Loading from "components/loading";
import ErrorMassage from "components/errorMassage";
import TagList from "components/tagList";

const Article = () => {
    const slug = useParams().slug;
    const apiUrl = `/articles/${slug}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        console.log("Article-useEffect");
        doFetch();
    }, [doFetch])

    return (
        <div className="article-page">
            <div className="banner">
                {!isLoading && response && (
                    <div className="container">
                        <h1>{response.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`/profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt="img" />
                            </Link>
                            <div className="info">
                                <Link to={`/profiles/${response.article.author.username}`}>
                                    {response.article.author.username}
                                </Link>
                                <span className="date">{response.article.createdAt}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container page">
                {isLoading && <Loading />}
                {error && <ErrorMassage />}
                {!isLoading && response && (
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <div>
                                <p>{response.article.body}</p>
                            </div>
                            <TagList tags={response.article.tagList} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Article;