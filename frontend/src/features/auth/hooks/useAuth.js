import  { login , register, getMe, logout } from"../services/auth.api"
import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const { user , setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password}) {
        setLoading(true)
        const data =await register ({ username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ username, email, password}){
        setLoading(true)
        const data = await login({ username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {

    try {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
    } catch (err) {
        console.log(err.response?.data);
        setUser(null);
    } finally {
        setLoading(false);
    }
    console.log("handleGetMe");
}
       async function handleLogout() {
       setLoading(true);
       await logout();
       setUser(null);
       setLoading(false);
}

        // useEffect(() =>{
        //      console.log("useEffect");
        //    handleGetMe() 
        // } , [])


    return ({
        user, loading, handleRegister, handleLogin, handleGetMe,handleLogout
})
}