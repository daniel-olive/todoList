import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "../components/Card/Card";
import { SignUp } from "../components/SignUp/SignUp";
import { SignIn } from "../components/SignIn/SignIn";
import { ProtectedLayout } from "../components/ProtectedLayout/ProtectedLayout";
import { UserProvider } from "../Contexts/ContextUsers";

export const RoutesList = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={ <ProtectedLayout><Card /></ProtectedLayout> }/>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};
