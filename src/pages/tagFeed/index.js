import React, {useEffect} from "react";
import useFetch from "hooks/useFetch";
import Feed from "components/feed";
import Pagination from "components/pagination";
import {getPaginator, limit} from "utils";
import {useLocation, useParams} from "react-router-dom";
import queryString  from "query-string";
import Loading from "components/loading";
import ErrorMassage from "components/errorMassage";
import PopularTags from "components/popularTags";
import FeedToggler from "components/feedToggler";

const TagFeed = (props) => {
    const tagName = useParams().slug;
    console.log('tagName', tagName)
    const {offset, currentPage} = getPaginator(useLocation().search);
    const stringifiedParams = queryString.stringify({
        limit,
        offset,
        tag: tagName
    })
    const url = useLocation().pathname;
    const apiUrl = `/articles?${stringifiedParams}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch, currentPage, tagName]);

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <FeedToggler tagName={tagName} />
                        {isLoading && <Loading />}
                        {error && <ErrorMassage />}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} url={url} currentPage={currentPage} limit={limit} />
                            </>
                        )}
                    </div>
                    <div className="col-md-3"><PopularTags /></div>
                </div>
            </div>
        </div>
    )
}

export default TagFeed;