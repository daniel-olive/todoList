import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const userTagsContext = createContext<any>({});


export const TagsProvider = ({ children }: { children: ReactNode }) => {
    const [ContextTagsGlobal, setContextTagsGlobal] = useState<any>('Amor');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const getDocsTag = getDoc()
                const q = query(collection(db, "tags", "tags", "Opa boy"));

                const querySnapshot = await getDocs(q);
                const tagsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setContextTagsGlobal(tagsList);
            } catch (error) {
                console.error("Erro ao buscar documentos: ", error);
            }
        };

        fetchData();
    }, []);

    return <userTagsContext.Provider value={{ tags: ContextTagsGlobal, setContextTagsGlobal }}>{children}</userTagsContext.Provider>;
};
