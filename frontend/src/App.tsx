import './App.css';
import React, { useState, useEffect } from 'react'
import SignUpModal from "./component/SignUpModal"
import LoginModal from "./component/LoginModal"
import NavBar from "./component/NavBar"
import AppRoutes from '../src/routes/route';
import  * as ItemApi from './network/item_api'
import { User } from "./models/user"
import { BrowserRouter, useNavigate } from "react-router-dom";
import LoadingSpinner from '../src/component/LoadingSpinner'; 

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setshowSignUpModal] = useState(false);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect( () => {
    async function fetchLoggedInUser() {
      try {
        const user = await ItemApi.getLoggedInUser();
        console.log("user:", user );
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLoggedInUser();
  }, []);  

  
    const onLogoutSuccessful = () => {
      setLoggedInUser(null);
      navigate("/"); 
    };
  return (
    <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setshowLoginModal(true)}
          onSignUpClicked={() => setshowSignUpModal(true)}
          onLogoutSuccessful={onLogoutSuccessful}
        />

        <div className="App">
           <AppRoutes loggedInUser={Boolean(loggedInUser)} />
        </div>
      <>
 
      </>
      {showSignUpModal && 
          <SignUpModal 
            onDismiss={() => setshowSignUpModal(false)}
            onSignUpSuccesful={(user) => {
              setLoggedInUser(user);
              setshowSignUpModal(false);
          }} />
        }
        {showLoginModal && 
            <LoginModal 
              onDismiss={() => setshowLoginModal(false)}
              onLogInSuccessful={(user) => { 
                setLoggedInUser(user);
                setshowLoginModal(false);
            }} />
        }

  
    </div>
  );
}

export default App;
