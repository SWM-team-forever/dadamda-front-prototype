import { Box, Typography, Button } from '@mui/material';

import { useDeleteScrap } from '@/api/scrap';
import theme from '@/assets/styles/theme';
import { useGetToken } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { logEvent } from '@/utility/amplitude';

const scrapDeleteModalButtonStyle = {
    backgroundColor: theme.color.Gray_050,
    borderRadius: '4px',
    boxShadow: 'none',
    width: 'fit-content',
    alignSelf: 'flex-end',
    p: '5px',
    '&:hover': {
        backgroundColor: theme.color.Blue_080,
        boxShadow: 'none',
    }
}

function ScrapDeleteElementModal() {
    const { modal, closeModal } = useModal();
    const { mutate } = useDeleteScrap();
    const handleDeleteScrapButtonClick = () => {
        const scrapId = modal.scrapId;
        mutate(scrapId);
        logEvent('delete_scrap');
        closeModal();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <Typography
                variant='h4'
                color={theme.color.Gray_080}
                sx={{
                    fontWeight: '500',
                    alignSelf: 'center',
                }}
            >
                한 번 삭제된 스크랩은 다시 복구할 수 없습니다. 정말 삭제하시겠습니까?
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '5px',
                    alignSelf: 'flex-end',
                }}
            >
                <Button
                    variant='contained'
                    sx={scrapDeleteModalButtonStyle}
                    onClick={closeModal}
                >
                    취소하기
                </Button>
                <Button
                    variant='contained'
                    sx={scrapDeleteModalButtonStyle}
                    onClick={handleDeleteScrapButtonClick}
                >
                    삭제하기
                </Button>
            </Box>
        </Box>
    );
}

export default ScrapDeleteElementModal;
