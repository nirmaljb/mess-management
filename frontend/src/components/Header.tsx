import { Link } from "react-router";
import { Button } from "./ui/button";
import { SignIn } from "@clerk/clerk-react";

export default function Header() {
    return (
        <header>
            <nav className="flex">
                <h1>Mess Management</h1>
                <div>
                    <Link to="/auth"><Button>Getting Started</Button></Link>
                </div>
            </nav>
        </header>
    )
}