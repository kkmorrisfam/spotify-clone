import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react";

// adds token to the axios instance, checks on every refresh
const updateApiToken = (token:string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};


const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const { getToken} = useAuth()
    const [ loading, setLoading ] = useState(true)


    // The effect function - side effect, runs after component renders
    // check everytime a page loads to see if a user has a token/is logged in
    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);

            } catch (error:any) {
                updateApiToken(null);
                console.log("Error in auth provider", error);   
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, 
    // dependency array - value(s) that the effect depends on
    // the effect will only re-run if any of these change between renders
    [getToken])

    if(loading) return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin" />
        </div>
    )

    return (
    <>{children}</>
  )
}

export default AuthProvider