import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import TopBar from "components/topBar";

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
                    path: "/article",
                    element: <Article />,
                },
            ],
        }
    ]);
}

export default routes;