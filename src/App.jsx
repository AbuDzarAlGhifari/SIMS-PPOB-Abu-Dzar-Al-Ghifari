import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import { useSelector } from 'react-redux';
import TopUp from './pages/top-up/TopUp';
import TransactionHistori from './pages/transaction/TransactionHistori';
import Transaction from './pages/transaction/Transaction';
import Profile from './pages/profile/profile';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/top-up"
          element={isAuthenticated ? <TopUp /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction-histori"
          element={
            isAuthenticated ? <TransactionHistori /> : <Navigate to="/" />
          }
        />
        <Route
          path="/transaction"
          element={isAuthenticated ? <Transaction /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
