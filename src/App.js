import { useEffect, useState } from 'react';
import {Container} from 'reactstrap'
import './App.css';
import LoginForm from './views/Login'

import ProjectCard  from './components/Card';
import projectJson from './projects.json'

function App() {
  let [showLogin, setShowLogin] = useState(true)
  const title = showLogin? "Login Page" : "Users"
  const toggle = () => {setShowLogin(!showLogin)}

  useEffect(()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if(isLoggedIn) setShowLogin(false)
  },[])
  const onLoginSuccess = () => {
    setShowLogin(false)
    localStorage.setItem("isLoggedIn", true)
  }
  return (
    <Container>
      <h1 className='h1'>{title}</h1>
      {/* <button onClick={()=> toggle()}>Show Projects</button> */}
      {showLogin
      ?(        
          <LoginForm onLoginSuccess={onLoginSuccess}/>        
         
      ):(
        <div>
                <button onClick={()=> toggle()}>Show Projects</button>

        {projectJson.map((project) => {
          return(
            <ProjectCard
            imgSrcUrl = {project.image_url}
            cardTitle = {project.name}
            description = {project.description}
            imgAltText = {project.name}
            />
          )
        })}
        </div>
      )}
      
      
      
    </Container>
    
  );
}

export default App;
