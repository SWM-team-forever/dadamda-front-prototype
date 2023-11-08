import { TRASH_ID, MultipleContainers } from "@/components/templates/BB.jsx";
import { UniqueIdentifier, CancelDrop } from "@dnd-kit/core";
import { useState, useRef } from "react";

export const TrashableItems = ({ confirmDrop, mode }: { confirmDrop: boolean, mode: string }) => {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const resolveRef = useRef<(value: boolean) => void>();

    const cancelDrop: CancelDrop = async ({ active, over }) => {
        if (over?.id !== TRASH_ID) {
            return true;
        }

        setActiveId(active.id);

        const confirmed = await new Promise<boolean>((resolve) => {
            resolveRef.current = resolve;
        });

        setActiveId(null);

        return confirmed === false;
    };

    return (
        <>
            <MultipleContainers
                cancelDrop={confirmDrop ? cancelDrop : undefined}
                trashable
                columns={undefined}
                items={{}}
                containerStyle={undefined}
                modifiers={undefined}
                renderItem={undefined}
                scrollable={undefined}
                mode={mode}
            />
        </>
    );
};

TrashableItems.argTypes = {
    confirmDrop: {
        name: 'Request user confirmation before deletion',
        defaultValue: false,
        control: { type: 'boolean' },
    },
};
