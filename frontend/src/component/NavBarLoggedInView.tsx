import { Navbar, Button } from "react-bootstrap";
import { User } from "../models/user";
import * as ItemApi from "../network/item_api";
import "./NavBarLoggedInView.css"

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
        <div className="navText">
            <Navbar.Text className="me-2">
                User: {user.username}
            </Navbar.Text>
            <Button className="logout" variant="primary" size="sm" onClick={logout}>Log out</Button>
        </div>
    );
}
export default NavBarLoggedInView;