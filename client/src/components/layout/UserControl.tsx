import {AiOutlineUser} from "react-icons/ai";
import {useForm} from "react-hook-form";
import {FC} from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure
} from "@chakra-ui/react";

type LoginFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LoginForm: FC<LoginFormProps> = props => {
    type FormValues = {
        email: string;
        password: string;
    };

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<FormValues>();

    const onCloseComplete = () => {
        reset();
    };

    const onSubmit = async (values: FormValues) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                props.onClose();
                resolve();
            }, 3000);
        });
    }

    return <>
        <Modal isOpen={props.isOpen} onClose={props.onClose} onCloseComplete={onCloseComplete}>
            <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl id="email" isInvalid={errors.email !== undefined}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="text" {...register("email", {
                                required: "Please provide a valid email address",
                                pattern: {
                                    message: "Please provide a valid email address",
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                },
                            })} />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="password" isInvalid={errors.password !== undefined}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" {...register("password", {
                                required: "Please provide your password",
                                minLength: {
                                    message: "Your password must contain at least 8 characters",
                                    value: 8,
                                },
                            })} />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" colorScheme="blue" mr={3} isLoading={isSubmitting}>Connect</Button>
                    <Button variant="ghost" isLoading={isSubmitting}>New Account</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>;
}

export const UserControl: FC = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return <>
        <LoginForm onClose={onClose} isOpen={isOpen} />

        <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<AiOutlineUser />}
            onClick={onOpen}
        />
    </>;
}
