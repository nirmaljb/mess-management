import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";

export default function Header() {
    const { isSignedIn } = useAuth();
    return (
        <header className="border-b-2">
            <nav className="flex justify-around cursor-pointer p-5 items-center">
                <div>
                    <p className="text-md">PU mess</p>
                </div>
                <div>
                    <ul className="flex space-x-5">
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Contact Info</li>
                    </ul>
                </div>
                {!isSignedIn &&<Link to="/auth">
                    Login
                </Link>}
                {isSignedIn && <Link to="/student/app">Dashboard</Link>}
            </nav>
        </header>
    )
}