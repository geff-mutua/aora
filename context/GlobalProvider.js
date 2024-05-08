import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContent=createContext();

export const useGlobalContext = ()=>useContext(GlobalContent);

 const GlobalProvider = ({children}) =>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [user,setUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res)

            }else{
                setIsLoggedIn(false);
                setUser(null)
            }
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])
    return (
        <GlobalContent.Provider 
        value={{
            isLoading,
            isLoggedIn,
            setIsLoggedIn,
            setUser,
            user
        }}
        >
            {children}
        </GlobalContent.Provider>
    )

}

export default GlobalProvider;