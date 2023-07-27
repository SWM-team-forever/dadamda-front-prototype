import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { OTHER_DATAS } from '../../config';
import theme from '../../assets/styles/theme';
import searchIcon from '../../assets/icons/SearchIcon.png';
import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import EmptyOtherScrapContainer from '../organisms/EmptyOtherScrapContainer';
import { GET_OTHER_SCRAP_URL } from '../../secret';
import fab from '../../assets/icons/fab.png';
import IconButton from '../atoms/IconButton';

function OtherTemplate() {
    const [others, setOthers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(GET_OTHER_SCRAP_URL, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:5173/',
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
            parameters: {
                pageable: {
                    "page": 0,
                    "size": 1,
                    "sort": [
                        "string"
                    ]
                }
            }
        }).then((response) => console.log(response));
    });

    return (
        <ScrapListContainer>
            <ScrapListHeader>
                <ScarpCountWrapper>
                    <EmpasizedTypography>{others.length} </EmpasizedTypography>
                    <DefaultTypography>개의 </DefaultTypography>
                    <EmpasizedTypography>기타 스크랩</EmpasizedTypography>
                    <DefaultTypography>이 있습니다.</DefaultTypography>
                </ScarpCountWrapper>
                <SearchBar>
                    <SearchIconWrapper src={searchIcon} />
                    <EmpasizedTypography>Search</EmpasizedTypography>
                </SearchBar>
            </ScrapListHeader>
            {others.length ? <ExistOtherScrapContainer contents={others} /> : <EmptyOtherScrapContainer />}
            <IconButton src={fab} style={{
                position: 'fixed',
                bottom: '15px',
                right: '15px',
                width: '48px',
                height: '48px',
            }} />
        </ScrapListContainer>
    )
}

const ScrapListContainer = styled.div`
    width: calc(100% - 200px);
    height: 100%;
    background-color: ${theme.color.background_color};
    position: fixed;
    right: 0;
    top: 50px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const ScrapListHeader = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
`

const ScarpCountWrapper = styled.div`

`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const EmpasizedTypography = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const SearchIconWrapper = styled.img`
    width: 24px;
    height: 24px;
`

export default OtherTemplate;