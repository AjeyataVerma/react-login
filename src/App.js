import {Container} from 'reactstrap'
import './App.css';
import LoginForm from './views/Login'
import Users  from './components/Card';
import SignupForm from './views/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <Container>
      
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
     
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      
      <Route path="/users" element={<Users/>} />
      
      
      
    </Routes>
      
      
     </Container>
    
  );
}

export default App;
