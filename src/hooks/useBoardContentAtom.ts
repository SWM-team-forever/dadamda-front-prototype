import { useSaveBoard } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import boardContainersAtom from "@/state/boardContainersAtom";
import boardContentAtom from "@/state/boardContentAtom";
import { TMemo, contentProps } from "@/types/ContentType";
import { useAtom } from "jotai"
import { unstable_batchedUpdates } from "react-dom";

export const useBoardContentAtom = () => {
    const [boardContent, setBoardContent] = useAtom(boardContentAtom);
    const [containers, setContainers] = useAtom(boardContainersAtom);
    const {board} = useBoardAtom();

    const { mutate } = useSaveBoard();

    function pasteScrap(scrap: contentProps['content']) {
        const firstColumn = Object.keys(boardContent)[0];
        const newBoard = firstColumn ? {
            ...boardContent,
            [firstColumn]: [
                ...boardContent[firstColumn],
                { ...scrap, id: `${scrap.scrapId + Math.random()}` },
            ],
        } : {
            [getNextContainerId()]: [{ ...scrap, id: `${scrap.scrapId + Math.random()}` }],
        };

        setBoardContent(newBoard);
        setContainers(Object.keys(newBoard));
    }

    function pasteSticker(sticker: TMemo) {
        const firstColumn = Object.keys(boardContent)[0];
        const newBoard = firstColumn ? {
            ...boardContent,
            [firstColumn]: [
                ...boardContent[firstColumn],
                { ...sticker, id: `${sticker.memoId + Math.random()}` },
            ],
        } : {
            [getNextContainerId()]: [{ ...sticker, id: `${sticker.memoId + Math.random()}` }],
        };

        setBoardContent(newBoard);
        setContainers(Object.keys(newBoard));
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();

        unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setBoardContent((items) => ({
                ...items,
                [newContainerId]: [],
            }));
        });
    }

    function getNextContainerId() {
        const containerIds = Object.keys(boardContent);
        const lastContainerId = containerIds[containerIds.length - 1];

        return lastContainerId ? String.fromCharCode(lastContainerId.charCodeAt(0) + 1): 'A';
    }

    function isEditMode(mode: 'view' | 'edit') {
        return mode === 'edit';
    }


    function handleSaveBoard(mode: 'view' | 'edit') {
        const boardUUID = board?.boardUUID;
        (boardUUID && isEditMode(mode)) && mutate({ boardUUID: boardUUID, contents: boardContent });
    }

    const SAVE_BOARD_INTERVAL = 10000; // 10초

    return {
        boardContent,
        setBoardContent,
        pasteScrap,
        containers,
        setContainers,
        getNextContainerId,
        handleAddColumn,
        pasteSticker,
        handleSaveBoard,
        SAVE_BOARD_INTERVAL,
    }
}
