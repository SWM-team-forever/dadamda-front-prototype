import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

import { decode } from 'html-entities';

const mobileProductStyle = {
    fontSize: '0.875rem',
    lineHeight: '120%',
    color: theme.color.text_gray_color,
    fontWeight: '700',
}

const desktopProductItemStyle = {
    fontSize: '1.25rem',
    lineHeight: '120%',
    fontWeight: '700',
    color: theme.color.text_gray_color,
}

const desktopProductListStyle = {
    fontSize: '0.9375rem',
    lineHeight: '120%',
    fontWeight: '400',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileVideoStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '120%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopVideoItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '120%',
}

const desktopVideoListStyle = {
    fontSize: '0.75rem',
    lineHeight: '120%',
    fontWeight: '400',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
    color: theme.color.text_gray_color,
}

const desktopArticleListStyle = {
    fontSize: '0.9375rem',
    color: theme.color.text_gray_color,
    fontWeight: '400',
    fontHeight: '120%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopArticleItemStyle = {
    fontSize: '1.875rem',
    fontWeight: '400',
    fontHeight: '120%',
    color: theme.color.text_gray_color,
}

const mobileArticleStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '120%',
}

const scrapCardStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '700',
    lineHeight: '120%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    mobileVideo: mobileVideoStyle,
    desktopVideoList: desktopVideoListStyle,
    desktopVideoItem: desktopVideoItemStyle,
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
    scrapCard: scrapCardStyle,
}


export function TitleElement({ title, varient }: any) {
    title = decode(title, { level: 'html5' });

    return (
        <Typography
            sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {title}
        </Typography>
    )
}