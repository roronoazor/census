import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import RegistrationPage from './views/RegistrationPage';
import LoginPage from './views/Login';
import SignupPage from './views/Signup';

function App() {
  const [token, setToken] = useState(false);
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth">
          {token ? (
            <Route element={<Navigate to="/" replace />} />
          ) : (
            <Route>
              <Route path="login" element={<LoginPage setToken={setToken} />} />
              <Route path="signup" element={<SignupPage setToken={setToken} />} />
            </Route>
          )}
        </Route>

        <Route path="/account">
          {token ? (
            <Route>
              <Route path="register" element={<RegistrationPage />} />
            </Route>
          ) : (
            <Route element={<Navigate to="/auth/login" replace />} />
          )}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
