interface IconProps {
    size?: string,
    fill: string,
    color?: string,
    secondaryColor?: string,
    width?: string,
    height?: string,
}

export function ShortcutIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 25" fill="none">
            <path d="M19.005 19.5C19.002 19.5 19 19.502 19 19.502L19.005 19.5ZM5 19.506C5 19.502 4.998 19.5 4.995 19.5H5V19.506ZM19 19.5V13.5H21V19.502C21.0003 19.7642 20.9489 20.0238 20.8487 20.2662C20.7486 20.5085 20.6017 20.7287 20.4164 20.9143C20.2312 21.0998 20.0112 21.2471 19.769 21.3475C19.5268 21.448 19.2672 21.4998 19.005 21.5H4.995C4.46615 21.4997 3.95902 21.2896 3.58497 20.9157C3.21092 20.5418 3.00053 20.0348 3 19.506V5.49396C3 4.39296 3.896 3.49996 4.997 3.49996H11V5.49996H5V19.5H19ZM5 19.506C5 19.502 4.998 19.5 4.995 19.5H5V19.506ZM11 5.49996H5V19.5H19V13.5H21V19.502C21.0003 19.7642 20.9489 20.0238 20.8487 20.2662C20.7486 20.5085 20.6017 20.7287 20.4164 20.9143C20.2312 21.0998 20.0112 21.2471 19.769 21.3475C19.5268 21.448 19.2672 21.4998 19.005 21.5H4.995C4.46615 21.4997 3.95902 21.2896 3.58497 20.9157C3.21092 20.5418 3.00053 20.0348 3 19.506V5.49396C3 4.39296 3.896 3.49996 4.997 3.49996H11V5.49996ZM19 5.49996V8.49996C19 8.76518 19.1054 9.01953 19.2929 9.20707C19.4804 9.3946 19.7348 9.49996 20 9.49996C20.2652 9.49996 20.5196 9.3946 20.7071 9.20707C20.8946 9.01953 21 8.76518 21 8.49996V4.49996C21 4.23474 20.8946 3.98039 20.7071 3.79285C20.5196 3.60532 20.2652 3.49996 20 3.49996H16C15.7348 3.49996 15.4804 3.60532 15.2929 3.79285C15.1054 3.98039 15 4.23474 15 4.49996C15 4.76518 15.1054 5.01953 15.2929 5.20707C15.4804 5.3946 15.7348 5.49996 16 5.49996H19Z" fill={fill} />
            <path d="M12.707 13.207L20.707 5.20696C20.8025 5.11471 20.8787 5.00437 20.9311 4.88236C20.9835 4.76036 21.0111 4.62914 21.0123 4.49636C21.0134 4.36358 20.9881 4.2319 20.9378 4.10901C20.8875 3.98611 20.8133 3.87446 20.7194 3.78056C20.6255 3.68667 20.5138 3.61242 20.391 3.56214C20.2681 3.51186 20.1364 3.48655 20.0036 3.48771C19.8708 3.48886 19.7396 3.51645 19.6176 3.56886C19.4956 3.62127 19.3852 3.69745 19.293 3.79296L11.293 11.793C11.1108 11.9816 11.01 12.2342 11.0123 12.4964C11.0146 12.7586 11.1198 13.0094 11.3052 13.1948C11.4906 13.3802 11.7414 13.4854 12.0036 13.4876C12.2658 13.4899 12.5184 13.3891 12.707 13.207Z" fill={fill} />
        </svg>
    );
}

export function MoreIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 25" fill="none">
            <path d="M12 21.5C13.1046 21.5 14 20.6046 14 19.5C14 18.3954 13.1046 17.5 12 17.5C10.8954 17.5 10 18.3954 10 19.5C10 20.6046 10.8954 21.5 12 21.5Z" fill={fill} />
            <path d="M12 14.5C13.1046 14.5 14 13.6046 14 12.5C14 11.3954 13.1046 10.5 12 10.5C10.8954 10.5 10 11.3954 10 12.5C10 13.6046 10.8954 14.5 12 14.5Z" fill={fill} />
            <path d="M12 7.5C13.1046 7.5 14 6.60457 14 5.5C14 4.39543 13.1046 3.5 12 3.5C10.8954 3.5 10 4.39543 10 5.5C10 6.60457 10.8954 7.5 12 7.5Z" fill={fill} />
        </svg>
    );
}

export function RightArrowIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9949 10.995C15.1824 11.1825 15.2877 11.4368 15.2877 11.702C15.2877 11.9672 15.1824 12.2215 14.9949 12.409L10.4019 17.002C10.2156 17.1846 9.96482 17.2862 9.70399 17.2849C9.44317 17.2836 9.19339 17.1794 9.00896 16.995C8.82452 16.8105 8.72032 16.5608 8.71901 16.2999C8.71769 16.0391 8.81936 15.7883 9.00192 15.602L12.9019 11.702L9.00192 7.80201C8.81936 7.61572 8.71769 7.36491 8.71901 7.10408C8.72032 6.84325 8.82452 6.59348 9.00896 6.40904C9.19339 6.22461 9.44317 6.12041 9.70399 6.11909C9.96482 6.11777 10.2156 6.21944 10.4019 6.40201L14.9949 10.995Z" fill={fill} />
        </svg>
    )
}

export function LeftArrowIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00494 10.995L13.5979 6.40199C13.6895 6.30854 13.7987 6.23416 13.9192 6.18318C14.0397 6.13219 14.1692 6.10559 14.3 6.10493C14.4309 6.10427 14.5605 6.12956 14.6816 6.17932C14.8026 6.22909 14.9125 6.30236 15.0051 6.39488C15.0976 6.48741 15.1708 6.59736 15.2206 6.71837C15.2704 6.83939 15.2957 6.96907 15.295 7.09992C15.2943 7.23077 15.2677 7.36019 15.2168 7.48069C15.1658 7.6012 15.0914 7.7104 14.9979 7.80199L11.0979 11.702L14.9979 15.602C15.1805 15.7883 15.2822 16.0391 15.2809 16.2999C15.2795 16.5607 15.1753 16.8105 14.9909 16.995C14.8065 17.1794 14.5567 17.2836 14.2959 17.2849C14.035 17.2862 13.7842 17.1846 13.5979 17.002L9.00494 12.41C8.81747 12.2225 8.71216 11.9682 8.71216 11.703C8.71216 11.4378 8.81747 11.1835 9.00494 10.996V10.995Z" fill={fill} />
        </svg>
    )
}

export function BoardIcon({ size, fill, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M3 2H21C21.5523 2 22 2.44772 22 3V8H2V3C2 2.44772 2.44772 2 3 2Z" fill={fill} />
            <path d="M2 10H11V22H3C2.44772 22 2 21.5523 2 21V10ZM13 10H22V21C22 21.5523 21.5523 22 21 22H13V10Z" fill={color} />
        </svg>
    )
}

export function TotalIcon({ size, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M18 21C17.8245 21.0001 17.652 20.9539 17.5 20.8662L12 17.6943L6.5 20.8662C6.34795 20.9539 6.17551 21 6.00001 20.9999C5.82451 20.9998 5.65211 20.9536 5.50013 20.8658C5.34815 20.778 5.22193 20.6518 5.13414 20.4999C5.04636 20.3479 5.0001 20.1755 5 20V5C5.00087 4.20462 5.31722 3.44206 5.87964 2.87964C6.44206 2.31722 7.20462 2.00087 8 2H16C16.7954 2.00087 17.5579 2.31722 18.1204 2.87964C18.6828 3.44206 18.9991 4.20462 19 5V20C18.9998 20.2652 18.8944 20.5194 18.7069 20.7069C18.5194 20.8944 18.2652 20.9998 18 21Z" fill={fill} />
        </svg>
    )
}

export function ArticleIcon({ width, height, fill, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 16" fill="none">
            <path d="M19 4H11C10.7348 4 10.4804 3.89464 10.2929 3.70711C10.1054 3.51957 10 3.26522 10 3C10 2.73478 10.1054 2.48043 10.2929 2.29289C10.4804 2.10536 10.7348 2 11 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3C20 3.26522 19.8946 3.51957 19.7071 3.70711C19.5196 3.89464 19.2652 4 19 4ZM19 8H11C10.7348 8 10.4804 7.89464 10.2929 7.70711C10.1054 7.51957 10 7.26522 10 7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8Z" fill={fill} />
            <path d="M7 0H1C0.447715 0 0 0.447715 0 1V7C0 7.55228 0.447715 8 1 8H7C7.55228 8 8 7.55228 8 7V1C8 0.447715 7.55228 0 7 0Z" fill={color} />
            <path d="M19 12H1C0.734784 12 0.48043 11.8946 0.292893 11.7071C0.105357 11.5196 0 11.2652 0 11C0 10.7348 0.105357 10.4804 0.292893 10.2929C0.48043 10.1054 0.734784 10 1 10H19C19.2652 10 19.5196 10.1054 19.7071 10.2929C19.8946 10.4804 20 10.7348 20 11C20 11.2652 19.8946 11.5196 19.7071 11.7071C19.5196 11.8946 19.2652 12 19 12ZM11 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H11C11.2652 14 11.5196 14.1054 11.7071 14.2929C11.8946 14.4804 12 14.7348 12 15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16Z" fill={fill} />
        </svg>
    )
}

export function ProductIcon({ size, fill, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <rect x="3" y="7" width="18" height="15" rx="2" fill={color} />
            <path d="M16 8.44444C16 5.98985 14.2091 4 12 4C9.79086 4 8 5.98985 8 8.44444" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export function VideoIcon({ size, fill, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M16.9884 11.5249C14.2679 9.95766 11.6628 8.50435 9 7V16C11.8021 14.358 14.7561 12.8536 17 11.5125L16.9884 11.5249Z" fill={fill} />
            <path d="M22.9738 9.25705C23.0204 7.68326 22.7063 6.12183 22.0603 4.71649C21.6286 4.13002 21.02 3.73327 20.3449 3.59811C17.5729 3.3335 14.7903 3.22593 12.0081 3.27592C9.22611 3.22566 6.44363 3.33324 3.67172 3.59811C3.12259 3.71086 2.61417 3.99359 2.20609 4.41309C1.31143 5.32498 1.24612 6.88802 1.11142 8.20471C0.963837 10.578 0.963837 12.9596 1.11142 15.3329C1.13577 16.0761 1.23697 16.8138 1.41306 17.5318C1.53232 18.0878 1.77524 18.6025 2.11997 19.0298C2.52811 19.4721 3.0477 19.7691 3.61136 19.8824C5.76718 20.1761 7.93967 20.2966 10.1115 20.2428V20.2429C13.6056 20.3043 16.6842 20.2392 20.3098 19.9395C20.8892 19.8301 21.4245 19.5293 21.8444 19.077C22.1172 18.7787 22.3237 18.4154 22.4481 18.0152C22.8097 16.8109 22.9873 15.5491 22.9738 14.281C23.008 13.6267 23.008 9.91136 22.9738 9.25705ZM15.6635 11.5224C15.6622 11.5217 15.661 11.5209 15.6597 11.5202C14.8305 12.0252 13.8721 12.5606 12.8617 13.1244C11.8465 13.6908 10.7796 14.2856 9.74088 14.9065V8.10062V8.10055C10.728 8.66937 11.7044 9.2286 12.6861 9.79366C13.6667 10.3581 14.6526 10.9283 15.6597 11.5202C15.6635 11.5178 15.6682 11.5154 15.672 11.513L15.6635 11.5224Z" fill={color} />
        </svg>
    )
}

export function LocationIcon({ width, height, fill, color, secondaryColor }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 21" fill="none">
            <g clip-path="url(#clip0_30_2941)">
                <path d="M13.6571 12.4407C16.7813 9.59471 16.7813 4.98048 13.6571 2.13451C10.5329 -0.711463 5.46757 -0.711463 2.34338 2.13451C-0.780817 4.98048 -0.780817 9.59471 2.34338 12.4407C5.46757 15.2867 10.5329 15.2867 13.6571 12.4407Z" fill={color} />
                <path d="M11.104 10.1147C12.818 8.55329 12.818 6.02179 11.104 4.4604C9.38997 2.89902 6.61099 2.89902 4.89697 4.4604C3.18295 6.02179 3.18295 8.55329 4.89697 10.1147C6.61099 11.6761 9.38997 11.6761 11.104 10.1147Z" fill={secondaryColor} />
                <path d="M8.64706 20.7028C9.26709 19.9528 10.2621 18.7091 11.3235 17.2273C11.7364 16.6505 11.1426 15.9153 10.4151 16.1033C9.68301 16.2928 8.83492 16.4407 7.97215 16.4407C7.10937 16.4407 6.2667 16.2942 5.53844 16.1069C4.80941 15.9188 4.21567 16.6562 4.6316 17.233C5.70466 18.7189 6.71509 19.9605 7.34439 20.7077C7.67373 21.0993 8.32159 21.0965 8.64706 20.7021V20.7028Z" fill={fill} />
            </g>
            <defs>
                <clipPath id="clip0_30_2941">
                    <rect width={width} height={height} fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
