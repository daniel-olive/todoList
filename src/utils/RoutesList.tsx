import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "../components/Card/Card";
import { SignUp } from "../components/SignUp/SignUp";
import { SignIn } from "../components/SignIn/SignIn";
import { ProtectedLayout } from "../components/ProtectedLayout/ProtectedLayout";
import { UserProvider } from "../Contexts/ContextUsers";
import { Notfound } from "../Pages/Notfound/Notfound";
import { UpdatePassword } from "../Pages/UpdatePassword/UpdatePassword";
import { EmailVerified } from "../Pages/EmailVerified/EmailVerified";
import { Form } from "../components/Form/Form";

export const RoutesList = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={ <ProtectedLayout><Card /></ProtectedLayout> }/>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/update_password" element={<UpdatePassword />} />
                    <Route path="/email_verified" element={<EmailVerified />} />
                    <Route path="/form" element={<Form onAddTask={function (input: string): void {
                        throw new Error("Function not implemented.");
                    } } />} />
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};
