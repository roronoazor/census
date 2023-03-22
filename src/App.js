import logo from './logo.svg';
import './App.css';
import LandingPage from './views/LandingPage';
import { Container } from '@mui/system';
import SignUpPage from './views/Signup';

function App() {
  return (
    <div className="App">
      {/* <LandingPage />
       */}
       <SignUpPage />
    </div>
  );
}

export default App;
