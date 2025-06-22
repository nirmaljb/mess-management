import { Link } from "react-router";
import { Button } from "./ui/button";
import { SignIn } from "@clerk/clerk-react";

export default function Header() {
    return (
        <header>
            <nav className="flex">
                <h1>Mess Management</h1>

                <div>
                    <SignIn />
                </div>
            </nav>
        </header>
    )
}