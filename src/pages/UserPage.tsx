import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

import theme from '@/assets/styles/theme';
import { useGetUserInformation } from '@/api/user';

import { DarkWaveVector, EditPencilSquareIcon, LightWaveVector } from '@/components/atoms/Icon';
import UserInfoTable from '@/components/molcules/UserPage/UserInfoTable';
import UserActionButtonGroup from '@/components/molcules/UserPage/UserActionButtonGroup';
import UserNicknameChangeWrapper from '@/components/molcules/UserPage/UserNicknameChangeWrapper';
import UserImageByModeWrapper from '@/components/molcules/UserPage/UserImageByModeWrapper';

export const useIsUserPageEditMode = (mode: string) => {
    return mode === 'edit';
}

export const useIsUserPageViewMode = (mode: string) => {
    return mode === 'view';
}

export const grayFullfilledButtonStyle = {
    color: 'white',
    backgroundColor: theme.color.Gray_070,
    '&:hover': {
        backgroundColor: theme.color.Gray_080,
    }
}

export const grayOutlinedButtonStyle = {
    color: theme.color.Gray_080,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.color.Gray_060}`,
}

function UserPage() {
    const { userInformation, isGetUserInformationLoading } = useGetUserInformation();

    const [mode, setMode] = useState('view');

    if (isGetUserInformationLoading) {
        return <div>로딩중</div>;
    }

    const { profileUrl, nickname } = userInformation;

    const changeModeIntoEdit = () => {
        setMode('edit');
    }

    const changeModeIntoView = () => {
        setMode('view');
    }

    function WaveVector({ vector }: { vector: JSX.Element }) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '-20px',
                    overflow: 'hidden',
                }}
            >
                {vector}
            </Box>
        )
    }

    return (
        <Wrapper>
            <WaveVector vector={<LightWaveVector />} />
            <WaveVector vector={<DarkWaveVector />} />
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '-20px',
                    overflow: 'hidden',
                }}
            >
                <DarkWaveVector />
            </Box>
            <Box
                sx={{
                    maxWidth: '580px',
                    width: '100%',
                }}
            >
                <UserInfoWrapper>
                    <UserImageByModeWrapper profileUrl={profileUrl} mode={'view'} changeModeIntoView={changeModeIntoView} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                            width: '100%',
                            p: {
                                xs: '120px 16px 20px 16px',
                                sm: '120px 0px 20px 0',
                            },
                            boxSizing: 'border-box',
                            justifyContent: 'center',
                        }}
                    >
                        <UserInfoTable userInformation={userInformation} mode={mode} />
                        <UserNicknameChangeWrapper mode={mode} nickname={nickname} changeModeIntoView={changeModeIntoView} />
                    </Box>
                    {
                        useIsUserPageViewMode(mode)
                        && <Button
                            variant='outlined'
                            startIcon={<EditPencilSquareIcon width='17' height='17' fill={theme.color.Blue_080} />}
                            sx={{
                                mb: '32px',
                            }}
                            onClick={changeModeIntoEdit}
                        >
                            프로필 수정하기
                        </Button>
                    }
                </UserInfoWrapper>
                <UserActionButtonGroup mode={mode} />
            </Box >
        </Wrapper >
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
`

const UserInfoWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: ${theme.color.Gray_020};
    border-radius: 8px;
    position: relative;
`

export default UserPage;
