import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import Header from './component/Header'
import Writer from './component/Writer'
import Todolist from './component/Todolist'
import SignUpModal from "./component/SignUpModal"
import LoginModal from "./component/LoginModal"
import NavBar from "./component/NavBar"
import  { ItemInput } from './network/item_api'
import  * as ItemApi from './network/item_api'
import { Item as ItemModel } from './models/item'
import axios from 'axios';
import ItemPageLoggedInView from "./component/ItemPageLoggedInView"
import { User } from "./models/user"
import ItemPageLoggedOutView from './component/ItemPageLoggedOutPage';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setshowSignUpModal] = useState(false);
  const [showLoginModal, setshowLoginModal] = useState(false);

  useEffect( () => {
    async function fetchLoggedInUser() {
      try {
        const user = await ItemApi.getLoggedInUser();
        console.log("user:", user );
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);  


  return (
    <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setshowLoginModal(true)}
          onSignUpClicked={() => setshowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

      <div className="App">
        {
          loggedInUser 
          ? <ItemPageLoggedInView/>
          : <ItemPageLoggedOutView/>
        }
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
