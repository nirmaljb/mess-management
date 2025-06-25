import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";

export default function Header() {
    const { isSignedIn } = useAuth();
    return (
        <header className="border-b-2">
            <nav className="flex justify-space cursor-pointer p-2 items-center">
                <div className="size-14 flex-none">
                    <p className="text-md">PU mess</p>
                </div>
                <div className="grow size-14 justify-center">
                    <ul className="flex gap-5 grow">
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Contact Info</li>
                    </ul>
                </div>
                {!isSignedIn &&<Link to="/auth" className="size-14 flex-none">
                    Login
                </Link>}
                {isSignedIn && <SignOutButton />}
            </nav>
        </header>
    )
}