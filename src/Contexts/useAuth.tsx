import { useContext } from "react"
import { userAuthContext } from "./ContextUsers"

export const useAuth = () => {
    const context = useContext(userAuthContext);

    return context;
}