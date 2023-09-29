import styled from 'styled-components';
import { Box } from '@mui/material';

import { googleLoginURL, kakaoLoginURL } from '@/secret';
import theme from '@/assets/styles/theme';
import googleLogo from '@/assets/icons/google_login.png';
import kakaoLogo from '@/assets/icons/kakao_logo.png';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import LoginButton from '@/components/atoms/LoginButton';

type TLoginProviderInformationElement = {
    url: string,
    source: string,
    style: { color: string, backgroundColor: string },
    label: string,
}

function LoginModalElement() {
    const loginProviderInformation: { [key: string]: TLoginProviderInformationElement } = {
        google: {
            url: googleLoginURL,
            source: googleLogo,
            style: { color: theme.color.icon_color, backgroundColor: 'white' },
            label: '구글로 시작하기',
        },
        kakao: {
            url: kakaoLoginURL,
            source: kakaoLogo,
            style: { color: 'rgba(0, 0, 0, 0.85)', backgroundColor: '#FEE500' },
            label: '카카오로 시작하기',
        }
    }

    const oAuthHandler = (loginProvider: string): void => {
        window.location.href = loginProviderInformation[loginProvider].url;
    };

    return (
        <Box>
            <TextContainer>
                <DefaultTypography>다담다 서비스를 사용하기 위해</DefaultTypography>
                <DefaultTypography>로그인해주세요.</DefaultTypography>
            </TextContainer>
            <ButtonContainer>
                <ColumnContainer style={{ width: '100%', gap: "10px" }}>
                    {Object.keys(loginProviderInformation).map((loginProvider, index) => (
                        <LoginButton
                            key={index}
                            onClick={() => oAuthHandler(loginProvider)}
                            style={loginProviderInformation[loginProvider].style}
                            iconSource={loginProviderInformation[loginProvider].source}
                            text={loginProviderInformation[loginProvider].label}
                        />
                    ))}
                </ColumnContainer>
            </ButtonContainer>
        </Box>
    );
}

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    align-items: center;
    padding-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
`

const DefaultTypography = styled.span`
    font-size: 14px;
`

export default LoginModalElement;
