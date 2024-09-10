import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

export const ViewTags = ({ tagId }: any) => {
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            if (tagId) {
                const tasksSnapshot = await getDocs(collection(db, "tags", tagId, "tasks"));
                const tasksList = tasksSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksList);
            }
        };

        fetchTasks();
    }, [tagId]);

    if (!tagId) return <p>Selecione uma tag para ver as tarefas.</p>;

    return (
        <div>
            <h3>Tarefas da Tag</h3>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};
