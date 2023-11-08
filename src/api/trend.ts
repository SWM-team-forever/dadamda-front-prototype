import { useGetCurrentTimeAndMonthLaterInSpecificDateFormat } from "@/hooks/useCalculateDateDiff";
import { useTrendingAtom } from "@/hooks/useTrendingAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import {
	CHANGE_HEART_URL,
	GET_TRENDING_LIST_URL,
	INCREASE_TRENDING_VIEW_COUNT_URL,
} from "@/secret";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { useGetToken } from "@/hooks/useAccount";

const getTrendingList = async ({
	pages,
	size,
	tag,
}: {
	pages: number;
	size: number;
	tag?: string;
}) => {
	const { currentTime, monthLaterTime } =
		useGetCurrentTimeAndMonthLaterInSpecificDateFormat();

	const urlWithoutTag =
		GET_TRENDING_LIST_URL +
		`?page=${pages}&size=${size}&startDate=${currentTime}&endDate=${monthLaterTime}`;
	const requestUrl = tag ? urlWithoutTag + `&tag=${tag}` : urlWithoutTag;

	const response = await fetch(requestUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetTrendingList = () => {
	const { trending } = useTrendingAtom();
	const isListTag = (tag: string) => tag === "LIST";

	const { data, fetchNextPage, hasNextPage, isLoading } =
		useInfiniteQuery(
			["trendingList", trending.tag],
			({ pageParam = 0 }) => {
				return isListTag(trending.tag)
					? getTrendingList({
							pages: pageParam,
							size: 3,
					  })
					: getTrendingList({
							pages: pageParam,
							size: 3,
							tag: trending.tag,
					  });
			},
			{
				getNextPageParam: (lastPage) => {
					return lastPage.data.last
						? undefined
						: lastPage.data.number + 1;
				},
				retry: false,
			}
		);

	const [
		trendingList,
		fetchNextTrendingList,
		hasNextTrendingList,
		isTrendingListLoading,
	] = [data, fetchNextPage, hasNextPage, isLoading];
	return {
		trendingList,
		fetchNextTrendingList,
		hasNextTrendingList,
		isTrendingListLoading,
	};
};

const changeHeart = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(`${CHANGE_HEART_URL}/${boardUUID}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useChangeHeart = () => {
	const queryClient = useQueryClient();

	return useMutation(changeHeart, {
		onSuccess: () => {
			queryClient.invalidateQueries(["trendingList"]);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"하트 클릭에 실패하였습니다",
				"error"
			);
		},
		retry: false,
	});
};

const increaseTrendingViewCount = async (boardUUID: string) => {
	const response = await fetch(
		`${INCREASE_TRENDING_VIEW_COUNT_URL}/${boardUUID}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useIncreaseTrendingViewCount = () => {
	const queryClient = useQueryClient();

	return useMutation(increaseTrendingViewCount, {
		onSuccess: () => {
			queryClient.invalidateQueries(["trendingList"]);
		},
		onError: (error) => {
			Sentry.captureException(error);
		},
		retry: false,
	});
};
