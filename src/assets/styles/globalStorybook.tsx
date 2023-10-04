import { Global, css } from '@storybook/theming';

export const fontUrl =
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';

const GlobalStyles = css`
    * {
        font-family: Pretendard,'Noto Sans KR', sans-serif !important;
    }
`;
export const GlobalStyle = () => <Global styles={GlobalStyles} />;
