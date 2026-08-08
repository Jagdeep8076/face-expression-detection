import {
    login,
    register,
    getMe,
    logout
} from "../services/auth.api";

import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;

    async function handleRegister({ username, email, password }) {
        try {
            setLoading(true);

            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin({ username, email, password }) {
        try {
            setLoading(true);

            const data = await login({
                username,
                email,
                password
            });

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    }

    async function handleGetMe() {
        try {
            setLoading(true);

            const data = await getMe();

            setUser(data.user);

            return data;
        } catch (err) {
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            setLoading(true);

            await logout();

            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    };
};