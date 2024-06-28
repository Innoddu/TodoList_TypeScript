import {useState} from "react";
import {useForm} from "react-hook-form";
import {User} from "../models/user";
import {SignUpCredentials} from "../network/item_api";
import * as ItemApi from "../network/item_api";
import {Modal, Form, Button} from "react-bootstrap";
import TextInputField from "./form/TextInputField";

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccesful: (user: User) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccesful } : SignUpModalProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await ItemApi.signUp(credentials);
            onSignUpSuccesful(newUser);
        } catch (error) {

            console.error(error);
        }
    }
    const CustomModalHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
        <Modal.Header closeButton {...({} as any)}>{children}</Modal.Header>
    )
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton {...({} as any)}>
                   <Modal.Title>Sign Up</Modal.Title>
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
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Email"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.email}
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
                            Sign Up
                        </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;