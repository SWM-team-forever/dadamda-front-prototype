import { Task, id } from "@/components/templates/BoardTemplate";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface Props {
    task: Task;
    deleteTask: (id: id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }

    return (
        <Box
            sx={{
                cursor: 'grab',
            }}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={toggleEditMode}
        >
            {task.content}
            {mouseIsOver
                && <Button
                    onClick={() => {
                        deleteTask(task.id)
                    }}
                    sx={{
                        opacity: 0.5,
                        '&:hover': {
                            opacity: 1,
                        }
                    }}
                >
                    - Delete
                </Button>}
        </Box>
    );
}

export default TaskCard;
