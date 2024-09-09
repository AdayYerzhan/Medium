import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";

export default () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <GlobalFeed />,
        },
        {
            path: "/article/:slug",
            element: <Article />,
        },
    ]);
}