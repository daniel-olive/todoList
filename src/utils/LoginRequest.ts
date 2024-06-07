import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { IUser } from "../Contexts/types";

export const setUserLocalStorage = (user: IUser | null) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserLocalStorage = () => {
    const json = localStorage.getItem("user");

    if (!json) {
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
};

export const LoginRequest = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
