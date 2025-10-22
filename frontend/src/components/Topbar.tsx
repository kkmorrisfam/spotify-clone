import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";


const Topbar = () => {
    const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 
    bg-zinc-900/75 backdrop-blur-md z-10 ">
        <div className="flex gap-2 items-center" >
            Spotify
        </div>    
        <div className="flex items-center gap-4">
            {/* { boolean && (if true render this block)} */}
            {isAdmin && (
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className="h-4 w-4 mr-2"/>
                    Admin Dashboard
                </Link>
            )}
            <SignedIn>
                <SignOutButton/>

            </SignedIn>

            <SignedOut>
                <SignInOAuthButtons/>
                
            </SignedOut>
        </div>
    </div>
  )
}

export default Topbar