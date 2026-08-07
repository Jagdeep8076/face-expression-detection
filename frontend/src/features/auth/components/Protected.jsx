import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {

    const {
        user, loading
    } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <h1>loading</h1>
    }
    
    if (!user) {
        return <useNavigate to="/login" />
    }

    return children
}

export default Protected