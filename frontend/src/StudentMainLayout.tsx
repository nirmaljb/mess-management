import { Outlet, useNavigate } from "react-router";
import StudentAppHeader from "./components/ui/StudentAppHeader";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function StudentMainLayout() {

    const { isSignedIn } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {

        if(!isSignedIn) {
            console.log('Not signed in')
            navigate('/auth');
        }
    }, [isSignedIn, navigate]);

    return (
        <>
            <StudentAppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}