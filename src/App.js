import logo from './logo.svg';
import './App.css';
import LandingPage from './views/LandingPage';
import { Container } from '@mui/system';
import SignUpPage from './views/Signup';
import LoginPage from './views/Login';
import RegistrationPage from './views/RegistrationPage';

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      {/* <SignUpPage />
      <LoginPage /> */}
      <RegistrationPage />
    </div>
  );
}

export default App;
