import logo from './logo.svg';
import './App.css';
import LandingPage from './views/LandingPage';
import { Container } from '@mui/system';
import SignUpPage from './views/Signup';
import LoginPage from './views/Login';

function App() {
  return (
    <div className="App">
      {/* <LandingPage />
       */}
       {/* <SignUpPage /> */}
       <LoginPage />
    </div>
  );
}

export default App;
