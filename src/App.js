import './App.css';
import React from 'react';
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from './Login/Login';
import { fetchData } from './database';
import Home from './Home/Home';

function ProtectedRoute(props) {
  const items = fetchData('LOGIN');
  if (items.length === 0) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
};

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
