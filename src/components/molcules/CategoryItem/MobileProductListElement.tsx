import { useState } from "react";
import { CardActionArea, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

import ColumnContainer from "../../atoms/ColumnContainer";
import RowContainer from "../../atoms/RowContainer";
import { IconButtonListElement } from "../../atoms/CategoryItem/IconButtonListElement";
import { ThumbnailElement } from "../../atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { PriceElement } from "../../atoms/CategoryItem/PriceElement";

import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import { MemoAreaElement } from "../../atoms/CategoryItem/MemoAreaElement";
import { SiteNameElement } from "../../atoms/CategoryItem/SiteNameElement";

interface MobileProductListElementProps {
    content: contentProps['content'],
}

function MobileProductListElement({ content }: MobileProductListElementProps) {
    const { thumbnailUrl, price, memoList, scrapId } = content;
    const varient = 'mobileProduct';
    const [open, setOpen] = useState(false);

    function Info({ content }: MobileProductListElementProps) {
        const { siteName, title } = content;

        return (
            <>
                <RowContainer
                    style={{
                        gap: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}>
                    <ColumnContainer>
                        <SiteNameElement siteName={siteName} varient={varient} />
                        <TitleElement title={title} varient={varient} />
                    </ColumnContainer>
                    <IconButtonListElement content={content} />
                </RowContainer>
            </>
        )
    }

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: 'white',
            }}

        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                <Info content={content} />
                <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                <ColumnContainer
                    style={{
                        width: '100%',
                        padding: '10px',
                        boxSizing: 'border-box',
                        gap: '5px',
                    }}
                >
                    <PriceElement price={price} varient={varient} />
                </ColumnContainer>
            </CardActionArea>
            {open && <MemoAreaElement content={content} />}
        </div>
    )
}

const StyledTextArea = styled(TextareaAutosize)`
    line-height: 1.2;
    resize: none;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    background: ${theme.color.background_color};
    border: none;
    border-radius: 4px;
    padding: 10px;
`;

export default MobileProductListElement;
