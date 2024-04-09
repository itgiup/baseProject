import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import reportWebVitals from './reportWebVitals';
import store, { persistor } from "./store";

import App from '@/App';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Khởi chạy dịch vụ

const router = createBrowserRouter([{
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ]
}]);

root.render(
  <Suspense fallback={<div className="suspense">loading...</div>} >
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={"loading"} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
