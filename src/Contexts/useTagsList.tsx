import { useContext } from "react"
import { userTagsContext } from "./ContextTags";

export const useTagsList = () => {
    const context = useContext(userTagsContext);

    return context;
}