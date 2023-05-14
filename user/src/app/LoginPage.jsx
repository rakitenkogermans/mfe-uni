import "./styles/reset.scss";
import "./styles/index.scss";
import {LoginForm} from "./LoginForm";
import { useStore } from 'store/Store';
import {Navigate} from "react-router-dom";

const LoginPage = () => {
    const {
        user,
        loginUser,
        logoutUser,
    } = useStore();
    const {
        user: loggedInUser,
        isLoading,
        showAlert,
        alertText,
        alertType
    } = user;

    if (loggedInUser) {
        return <Navigate to="/" />
    }
    return (
        <LoginForm
            isLoading={isLoading}
            handleLogin={loginUser}
            showAlert={showAlert}
            alertText={alertText}
            alertType={alertType}
        />
    )
}

export { LoginPage }
