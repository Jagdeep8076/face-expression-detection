import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {

    const {
        user,
        loading,
        handleGetMe
    } = useAuth();

    useEffect(() => {
        handleGetMe().catch(() => {
            // User is not logged in
        });
    }, []);

    if (loading) {
        return <h1>loading</h1>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;