import styled from 'styled-components';

import { contentProps } from '../../types/ContentType';
import Memo from './Memo';
import Button from '../atoms/DefaultButton';
import Chip from '../atoms/Chip';

import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import theme from '../../assets/styles/theme';
import ThumbnailImage from '../atoms/ThumbnailImage';

interface ProductScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function ProductScrapCard({ content, showMemoCreateModal, showTooltip }: ProductScrapCardProps) {

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}>
            {content.siteName && <Chip>{content.siteName}</Chip>}
            {content.title && <EmpasizedTypography>{content.title}</EmpasizedTypography>}
            {content.thumbnailUrl && <ThumbnailImage thumbnailUrl={content.thumbnailUrl} />}
            {content.price && <ColoredTypography>{content.price}</ColoredTypography>}
            {content.description && <DefaultTypography>{content.description}</DefaultTypography>}
            {content.memoList?.map(memo => {
                return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
            })}
            <ButtonContainer>
                <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound onClick={(e) => {
                    e.stopPropagation();
                    showMemoCreateModal();
                }} />
                <MoreIconContainer src={MoreIcon} onClick={(e) => {
                    e.stopPropagation();
                    showTooltip();
                }} />
            </ButtonContainer>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    border-radius: 4px;
`

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const ColoredTypography = styled(EmpasizedTypography)`
    color: ${theme.color.primary_opacity_color};
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`

const MoreIconContainer = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default ProductScrapCard;
