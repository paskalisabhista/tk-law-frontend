import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AUTH_BACKEND_URL } from "./api";

const useLogin = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState(null);
    // const [role, setRole] = useState(null);

    const login = async (username, password) => {
        const url = `${AUTH_BACKEND_URL}/token/login`;
        axios
            .post(url, {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                console.log(res.data["access"]);
                console.log(res.data["refresh"]);
                localStorage.setItem("accessToken", res.data["access"]);
                localStorage.setItem("refreshToken", res.data["refresh"]);
                console.log(
                    "accessToken from localStorage : " +
                        localStorage.getItem("accessToken")
                );
                setIsLoggedIn(true);
                router.push("/");
            })
            .catch(function name(err) {
                console.log(err);
            });
    };

    const detail = async () => {
        const url = `${AUTH_BACKEND_URL}/token/detail`;
        const accessToken = localStorage.getItem("accessToken");
        let username;
        let role;

        await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                username = res.data["username"]
                role = res.data["role"]
            })
            .catch(function name(err) {
                console.log(err);
                console.log("do refresh");
                if (refresh()) {
                    console.log("inside if");
                    detail();                    
                }
            });
        return { username, role };
    };

    const verify = () => {
        const url = `${AUTH_BACKEND_URL}/token/verify`;
        const accessToken = localStorage.getItem("accessToken");
        axios
            .post(url, {
                token: accessToken,
            })
            .then(() => {
                console.log("Token is valid");
            })
            .catch(function name(err) {
                console.log("Token is not valid or expired");
                refresh();
            });
    };

    const refresh = () => {
        const url = `${AUTH_BACKEND_URL}/token/refresh`;
        const refreshToken = localStorage.getItem("refreshToken");
        let isRefreshed = false;
        axios
            .post(url, {
                refresh: refreshToken,
            })
            .then((res) => {
                console.log("refresh success!")
                localStorage.setItem("accessToken", res.data["access"]);
                isRefreshed = true;
                window.location.reload(true)           
            })
            .catch(function name(err) {
                console.log("Please relog your account");
                logout();
                isRefreshed = false;
            });
        return isRefreshed;
    };

    const logout = () => {
        // Clear the token from local storage or a cookie
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Set the logged-in state to false
        setIsLoggedIn(false);

        // Redirect the user to the login page or any other appropriate page
        router.push("/login");
    };

    const register = (username, password, passwordConfirmation, role) => {
        const url = `${AUTH_BACKEND_URL}/token/register`;
        axios
            .post(url, {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                role: role,
            })
            .then((res) => {
                console.log("Register succees!");
                console.log(
                    `Your username: ${res.data["username"]}, role as : ${res.data["role"]}`
                );
                router.push("/login");
            })
            .catch(function name(err) {
                console.log(err);
            });
        
    };

    return {
        isLoggedIn,
        login,
        detail,
        verify,
        refresh,
        logout,
        register,
    };
};

export default useLogin;
