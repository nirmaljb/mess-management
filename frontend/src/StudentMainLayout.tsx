import { Outlet } from "react-router";
import StudentAppHeader from "./components/ui/StudentAppHeader";

export default function StudentMainLayout() {
    return (
        <>
            <StudentAppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}