import { Button } from "react-bootstrap";
import "../style/NavBarLoggedOutViewProps.css"


interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,

}
const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked} : NavBarLoggedOutViewProps) => {


    return (
        <div className="navButton">
            <Button className="signup" variant="primary" size="sm" onClick={onSignUpClicked}>Sign Up</Button>
            <Button className="login" variant="primary" size="sm" onClick={onLoginClicked}>LogIn</Button>
        </div>
    );
}

export default NavBarLoggedOutView