import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';

interface OtherTemplateProps {
    others: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        scrapCreatedDate: string,
        scrapId: number,
        memoList: [{
            memoId: number,
            memoImageURL?: string,
            memoText?: string,
        }],
    }[],
}

function OtherTemplate({ others }: OtherTemplateProps) {
    return (
        <>
            <ScrapListHeader type='기타' count={others.length} />
            {others.length ? <ExistOtherScrapContainer contents={others} /> : <EmptyScrapContainer />}
        </>
    )
}

export default OtherTemplate;