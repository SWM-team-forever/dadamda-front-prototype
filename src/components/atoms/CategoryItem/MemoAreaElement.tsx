import { TextareaAutosize } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styled from 'styled-components';
import theme from "../../../assets/styles/theme";
import { useDefaultSnackbar } from "../../../hooks/useWarningSnackbar";
import { POST_CREATE_MEMO_URL } from "../../../secret";
import Memo from "../../molcules/Memo";
import { useCategoryItemList } from "../../../context/CategoryListContext";
import ColumnContainer from "../ColumnContainer";
import { contentProps } from "../../../types/ContentType";

interface MemoAreaElementProps {
    content: contentProps['content'],
}

export function MemoAreaElement({ content }: MemoAreaElementProps) {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [textAreaValue, setTextAreaValue] = useState('');
    const { memoList, scrapId } = content;

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    let createdMemoCount = 0;

    function onEnterPress(e: any) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            createMemo();
            createdMemoCount += 1;
            const changedMemoList = [...memoList, {
                memoId: -1 * createdMemoCount,
                memoText: e.target.value,
            }];

            const changedContentList = categoryItemList.map(item => item.scrapId === scrapId ? { ...item, memoList: changedMemoList } : item);
            setCategoryItemList(changedContentList);

            e.target.value = '';
        }
    }

    function createMemo() {
        const token = localStorage.getItem('token');
        token &&
            fetch(POST_CREATE_MEMO_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
                body: JSON.stringify({
                    scrapId: scrapId,
                    memoText: textAreaValue,
                }),
            }).then((response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then(() => {
                    useDefaultSnackbar('메모가 추가되었습니다.', 'success');
                })
        // .catch(err => setError(err.message));
    }

    return (
        <ColumnContainer
            style={{
                padding: '10px',
                boxSizing: 'border-box',
                gap: '10px',
            }}>
            {
                memoList?.map((memo) => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })
            }
            <div
                style={{
                    width: '100%',
                }}>
                <StyledTextArea placeholder='메모를 입력해주세요.' minRows={4} onKeyDown={onEnterPress} onChange={e => handleSetValue(e)} />
            </div>
        </ColumnContainer>
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
    font-size: 14px;
    color: ${theme.color.text_gray_color};
    font-family: 'NanumSquare', sans-serif;
    &::placeholder {
        color: ${theme.color.text_gray_color};
    }
`;
