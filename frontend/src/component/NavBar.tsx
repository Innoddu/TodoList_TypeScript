import { Navbar, Nav, Container } from "react-bootstrap";
import { User } from "../models/user"
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import '../style/NavBar.css'

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful} : NavBarProps) => {

    return (
        <Navbar className="custom-navbar" sticky="top">
            <Container>
                 <Navbar.Brand as={Link} to="/">
                    ToDoList
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ml-auto">
                        {loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                        : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                        }    
                    </Nav>  
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;