import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { YORKIE_API_KEY } from "@/secret";
import { Box, Button, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import yorkie from "yorkie-js-sdk";

async function connectYorkie() {
    const client = new yorkie.Client('https://api.yorkie.dev', {
        apiKey: YORKIE_API_KEY,
    });
    await client.activate();

    const doc = new yorkie.Document('my-first-document');
    await client.attach(doc);

    return doc;
}

const doc = await connectYorkie();

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId() {
        return searchParams.get('boardId');
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();

    useLayoutEffect(() => {
        setBoard({
            ...board,
            title: doc.getRoot()[boardPageId].title,
            boardId: boardPageId,
        });
    }, [])

    const { openModal } = useModal();

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100% - 56px)',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '24px',
                    fontWeight: '500',
                    m: '20px',
                }}
            >
                {board.title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TrashableItems confirmDrop={false} doc={doc} boardId={boardPageId} />
                <Box>
                    <Button
                        onClick={() => openModal('scrapCreateOnBoard')}
                    >
                        스크랩 추가
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardInfoPage;