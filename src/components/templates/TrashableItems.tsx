import { TRASH_ID, MultipleContainers } from "@/components/templates/BB";
import { UniqueIdentifier, CancelDrop } from "@dnd-kit/core";
import { useState, useRef } from "react";

export const TrashableItems = ({ confirmDrop }: { confirmDrop: boolean }) => {
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
            />
            {/* {activeId && (
                <ConfirmModal
                    onConfirm={() => resolveRef.current?.(true)}
                    onDeny={() => resolveRef.current?.(false)}
                >
                    Are you sure you want to delete "{activeId}"?
                </ConfirmModal>
            )} */}
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