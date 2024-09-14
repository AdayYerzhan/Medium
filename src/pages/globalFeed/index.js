import React, {useEffect} from "react";
import useFetch from "hooks/useFetch";
import Feed from "components/feed";
import Pagination from "components/pagination";
import {getPaginator, limit} from "utils";
import {useLocation} from "react-router-dom";
import queryString  from "query-string";
import Loading from "components/loading";
import ErrorMassage from "components/errorMassage";
import PopularTags from "components/popularTags";

const GlobalFeed = () => {
    const {offset, currentPage} = getPaginator(useLocation().search);
    const stringifiedParams = queryString.stringify({
        limit,
        offset,
    })
    const url = useLocation().pathname;
    const apiUrl = `/articles?${stringifiedParams}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch, currentPage]);

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

export default GlobalFeed;