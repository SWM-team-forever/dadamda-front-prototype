import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_CREATE_MEMO_URL } from "../secret";
import { useDefaultSnackbar } from "../hooks/useWarningSnackbar";

const fetchPostCreateMemo = async({token, scrapId, textAreaValue}) => {
    return await fetch(POST_CREATE_MEMO_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            scrapId: scrapId,
            memoText: textAreaValue,
        }),
    })
    .then((response) => {
        const body = response.json();
        if (response.ok) {
            return body;
        } else {
            throw new Error(body.resultCode);
        }
    });
}

export const usePostCreateMemo = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchPostCreateMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries('scraps');
            useDefaultSnackbar('메모가 생성되었습니다', 'success');
        }
    });
}
