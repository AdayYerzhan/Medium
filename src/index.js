import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from "react-router-dom";

import router from "pages/routes";

const App = () => {
    return (
        <div>
            <h3>Welcome!</h3>
            <RouterProvider router={router()}></RouterProvider>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

