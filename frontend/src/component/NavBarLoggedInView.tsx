import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import * as ItemApi from "../network/item_api";
import "../style/NavBarLoggedInView.css"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void;

}
const NavBarLoggedInView = ({ user, onLogoutSuccessful} : NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await ItemApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    return (
        <div className="navText" style={{letterSpacing: '1.1px'}}>
            <Navbar.Text className="me-2">
                User:  <span className="username-box">{user.username}</span>
            </Navbar.Text>
            <Link style={{textDecoration: 'none', paddingBottom: '0px'}} to="/completed-tasks">
                <Button className="complete-task" style={{paddingTop: '10px', paddingBottom: '10px'}} variant="primary" size="sm">
                Completed Tasks
                </Button>
            </Link>
            <Button className="logout" variant="primary" size="sm" onClick={logout}>Log out</Button>
        </div>
    );
}
export default NavBarLoggedInView;