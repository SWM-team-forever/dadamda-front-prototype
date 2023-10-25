import styled from 'styled-components';

import { Box, Chip, Grid, Typography } from '@mui/material';
import BoardListHeader from '@/components/molcules/BoardListHeader';
import theme from '@/assets/styles/theme';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useFixBoardList, useGetBoard, useGetBoardList, useSearchKeywordInBoardList } from '@/api/board';
import { MenuIcon, ProfileIcon, StarIcon } from '@/components/atoms/Icon';
import { getTimeDiff } from '@/hooks/useCalculateDateDiff';
import { useModal } from '@/hooks/useModal';
import { useBoardAtom } from '@/hooks/useBoardAtom';
import { chipInformation } from '@/components/atoms/Modal/BoardEditModalElement';
import InfiniteScroll from 'react-infinite-scroller';
import { useRef } from 'react';

export interface IBoardListInfo {
    uuid: number;
    title: string;
    description: string;
    isFixed?: string,
    tag: string,
    modifiedDate: number,
}

function BoardListTemplate() {
    const navigate = useNavigate();
    const { openModal } = useModal();
    const [searchParams, setSearchParams] = useSearchParams();

    function isSearchTemplate() {
        return searchParams.has('keyword');
    }

    function getKeyword() {
        return searchParams.get('keyword');
    }

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['boards', getKeyword()],
        ({ pageParam = 0 }) => {
            return isSearchTemplate()
                ? useSearchKeywordInBoardList({ pages: pageParam, size: 30, keyword: getKeyword() })
                : useGetBoardList({ pages: pageParam, size: 2 })
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.data.last ? undefined : lastPage.data.number + 1;
            },
        }
    );

    const { setBoard } = useBoardAtom();
    const { mutate } = useFixBoardList();

    if (isLoading) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                로딩중
            </Box>
        )
    }

    return (
        <>
            <ScrapListContainer>
                <BoardListHeader />
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                        width: '100%',
                        p: '10px 24px',
                        boxSizing: 'border-box',
                        overflow: 'auto',
                    }}
                >
                    <InfiniteScroll
                        hasMore={hasNextPage}
                        loadMore={() => fetchNextPage()}
                        useWindow={false}
                        loader={<div key={0}>Loading ...</div>}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                m: '0',
                                display: 'grid',
                                gap: 2,
                                pb: '24px',
                            }}
                            gridTemplateColumns={
                                {
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                    lg: 'repeat(4, 1fr)',
                                    xl: 'repeat(5, 1fr)',
                                }
                            }
                        >
                            {data?.pages.map((page) => {
                                return page.data.content.map((board: IBoardListInfo) => {
                                    return (
                                        <Grid item
                                            key={board.uuid}
                                            onClick={() => navigate(`/board-contents/${board.uuid}`)}
                                        >
                                            <Box
                                                sx={{
                                                    height: '180px',
                                                    width: '100%',
                                                    backgroundColor: theme.color.Blue_090,
                                                    borderRadius: '8px 8px 0 0',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: theme.color.Blue_080,
                                                    },
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <ProfileIcon size='80' />
                                            </Box>
                                            <Box
                                                sx={{
                                                    p: '10px',
                                                    backgroundColor: theme.color.Gray_020,
                                                    borderRadius: '0 0 8px 8px',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            '-webkit-line-clamp': '1',
                                                            '-webkit-box-orient': 'vertical',
                                                            wordWrap: 'break-word',
                                                        }}
                                                    >
                                                        {board.title}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: '5px',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                mutate(board.uuid.toString());
                                                            }}
                                                        >
                                                            <StarIcon width='12' height='12' fill={board.isFixed ? theme.color.Blue_090 : theme.color.Gray_070} />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                const boardInfo = await useGetBoard(board.uuid.toString());
                                                                setBoard((prev) => ({
                                                                    ...prev,
                                                                    boardUUID: board.uuid.toString(),
                                                                    ...boardInfo.data,
                                                                }))
                                                                openModal('boardEdit');
                                                            }}
                                                        >
                                                            <MenuIcon width='12' height='12' fill={theme.color.Gray_070} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                    }}
                                                >
                                                    <Chip label={chipInformation.map((chipInfo) =>
                                                        chipInfo.tagValue === board.tag && chipInfo.label
                                                    )} />
                                                    <Typography>{getTimeDiff(board.modifiedDate)}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            })}

                        </Box>
                    </InfiniteScroll>
                </Box>
            </ScrapListContainer >
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 209px);
    height: calc(100% - 56px);
    position: fixed;
    right: 0;
    top: 56px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

export default BoardListTemplate;
