import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from "react-router-dom";

import routes from "pages/routes";
import {CurrentUserProvider} from "constexts/currentUser";

const App = () => {
    return (
        <CurrentUserProvider>
            <RouterProvider router={routes()} />
        </CurrentUserProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

