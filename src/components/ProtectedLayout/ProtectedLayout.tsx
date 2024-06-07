import { SignIn } from "../SignIn/SignIn";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
    const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
    const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
    if (!sessionToken && !sessionUser) {
        return <SignIn />;
    }

    return children;
};
