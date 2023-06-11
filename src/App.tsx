import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./components/Login/index"
import Dashboard from "./components/Dashboard/index"
import RouteGuard from './components/RouteGuard/routeguard';
import useAuth from './hooks/useAuth';
function App() {
  return (
    <div className="App">

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RouteGuard Component={Dashboard} />  } />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
