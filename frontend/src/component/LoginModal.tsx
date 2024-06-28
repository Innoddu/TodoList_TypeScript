import { useForm } from "react-hook-form";
import {User} from "../models/user";
import { LoginCredentials } from "../network/item_api";
import * as ItemApi from "../network/item_api";
import { Modal, Button, Form } from "react-bootstrap";
import TextInputField from "./form/TextInputField";

interface LoginModalProps {
    onDismiss: () => void,
    onLogInSuccessful: (user: User) => void,
}

const LoginModal = ({ onDismiss, onLogInSuccessful }: LoginModalProps ) => {
    
    const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await ItemApi.login(credentials);
            onLogInSuccessful(user);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }
    const CustomModalHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
        <Modal.Header closeButton {...({} as any)}>{children}</Modal.Header>
    )
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton {...({} as any)}>
                   <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Username"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.username}
                        />
                        <TextInputField
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.password}
                        />
                        <Button
                        type="submit"
                        disabled={isSubmitting}
                        >
                            Login
                        </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;