import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from "react-router-dom";

import routes from "routes";
import {CurrentUserProvider} from "constexts/currentUser";
import CurrentUserChecker from "components/currentUserChecker";

const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <RouterProvider router={routes()} />
             </CurrentUserChecker>
        </CurrentUserProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

