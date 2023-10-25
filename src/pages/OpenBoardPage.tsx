import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { useGetOpenBoardTitle } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";

import { TrashableItems } from "@/components/templates/TrashableItems";

function OpenBoardPage() {
    const params = useParams();

    function getBoardPageId(): string | null {
        return params['boardUUID'] || null;
    }
    const { setBoard } = useBoardAtom();

    const boardPageId = getBoardPageId();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ['boardTitle', boardPageId],
        () => boardPageId && useGetOpenBoardTitle(boardPageId),
        {
            enabled: !!boardPageId,
            onError: (error: Error) => {
                if (error.message === "NF005") {
                    useDefaultSnackbar('존재하지 않거나 권한이 없는 보드입니다.', 'error');
                    navigate('/not-found');
                }
            },
            onSuccess: () => {
                setBoard((prev) => ({
                    ...prev,
                    boardUUID: boardPageId,
                }))
            },
            select: (data) => {
                return data?.data.title;
            },
            retry: false,
            useErrorBoundary: (error: Error) => error.message !== "NF005",
        }
    )

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 'calc(100% - 56px)',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '24px',
                        fontWeight: '500',
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100% - 56px)',
                position: 'fixed',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    pb: '100px',
                    boxSizing: 'border-box',
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
                    {data}
                </Typography>
                {boardPageId && <TrashableItems confirmDrop={false} mode={'view'} isBoardShared={true} />}
            </Box>
        </Box >
    );
}

export default OpenBoardPage;
