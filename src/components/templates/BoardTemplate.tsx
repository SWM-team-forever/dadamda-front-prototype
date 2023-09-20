import ColumnContainer from "@/components/molcules/Board/ColumnContainer";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export type id = string | number;
export type Column = {
    id: id;
    title: string;
}

function BoardTemplate({ boardId }: { boardId: string | null }) {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    return (
        <div>
            보드 {boardId} 보드 페이지
            <Box>
                <DndContext onDragStart={onDragStart}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <SortableContext
                            items={columnsId}
                        >
                            {columns.map((column) =>
                                <ColumnContainer
                                    column={column}
                                    deleteColumn={deleteColumn}
                                    key={column.id}
                                />
                            )}
                        </SortableContext>
                    </Box>
                    <Button
                        onClick={createNewColumn}
                    >
                        + Add Column
                    </Button>
                </DndContext>

            </Box>
        </div>
    );

    function createNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    function deleteColumn(id: id) {
        const newColumns = columns.filter((column) => column.id !== id);
        setColumns(newColumns);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'column') {
            const column = event.active.data.current?.column;
            setActiveColumn(column);
            return;
        }
    }
}

function generateId() {
    return Math.floor(Math.random() * 10001);
}

export default BoardTemplate;
