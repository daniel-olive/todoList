import { ReactNode, createContext, useEffect, useState } from "react";
import { app } from "../Firebase";
import { getAuth, signInWithPopup as signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export const userAuthContext = createContext<any>({});

const provider = new GoogleAuthProvider();

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const loadStorageAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionToken && sessionUser) setUser(JSON.parse(sessionUser));
        };
        loadStorageAuth();
    }, []);

    const signInGoogle = async () => {
        try {
            const result = await signInWithRedirect(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token: any = credential?.accessToken;
            const user = result.user;
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        sessionStorage.removeItem("@AuthFirebase:token");
        sessionStorage.removeItem("@AuthFirebase:user");
        setUser(null);
    };

    return <userAuthContext.Provider value={{ user, setUser, signInGoogle, logout, signed: !!user }}>{children}</userAuthContext.Provider>;
};
