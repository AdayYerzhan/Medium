import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import TopBar from "components/topBar";
import Authentication from "pages/authentication";
import TagFeed from "pages/tagFeed";
import YourFeed from "pages/yourFeed";

const routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <TopBar />,
            children: [
                {
                    index: true,
                    element: <GlobalFeed />,
                },
                {
                    path: "/feed",
                    element: <YourFeed />,
                },
                {
                    path: "/tags/:slug",
                    element: <TagFeed />,
                },
                {
                    path: "/login",
                    element: <Authentication />,
                },
                {
                    path: "/register",
                    element: <Authentication />,
                },
                {
                    path: "/article/:slug",
                    element: <Article />,
                },
            ],
        }
    ]);
}

export default routes;