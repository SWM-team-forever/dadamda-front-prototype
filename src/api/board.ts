import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { DELETE_BOARD_URL, EDIT_BOARD_URL, GET_BOARD_LIST_URL, GET_BOARD_URL, POST_CREATE_BOARD_URL, SEARCH_BOARD_LIST_URL } from "@/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Sentry from '@sentry/react';

interface fetchDatasProps {
    url?: string;
    pages: number;
    size: number;
}

const getBoardList = async ({  url, pages, size }: fetchDatasProps) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(url + `?page=${pages}&size=${size}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
};

export const useGetBoardList = ({ pages, size }: fetchDatasProps) => {
    const boards = getBoardList({ url: GET_BOARD_LIST_URL, pages: pages, size: size });
    return boards;
}

interface fetchPostCreateBoardProps {
    title: string,
    description: string,
    tag: string,
}

const fetchPostCreateBoard = async({title, description, tag}: fetchPostCreateBoardProps) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(POST_CREATE_BOARD_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            tag: tag,
        }),
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const usePostCreateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(fetchPostCreateBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            queryClient.invalidateQueries(['boardListCount']);
            useDefaultSnackbar('보드가 생성되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 생성에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}

const getBoard = async (boardUUID: string) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${GET_BOARD_URL}/${boardUUID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useGetBoard = (boardUUID: string) => {
    const board = getBoard(boardUUID);
    return board;
}

const deleteBoard = async (boardUUID: string) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${DELETE_BOARD_URL}/${boardUUID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            queryClient.invalidateQueries(['boardListCount']);
            queryClient.invalidateQueries(['board']);
            useDefaultSnackbar('보드가 삭제되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 삭제에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}

interface editBoardProps {
    boardUUID: string,
    title: string,
    description: string,
    tag: string,
}

const editBoard = async ({boardUUID, description, tag, title}: editBoardProps) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${EDIT_BOARD_URL}/${boardUUID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            tag: tag,
        }),
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useEditBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(editBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            queryClient.invalidateQueries(['board']);
            useDefaultSnackbar('보드가 수정되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 수정에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}

interface saveBoardProps {
    boardUUID: string,
    contents: any,
}

const saveBoard = async ({boardUUID, contents}: saveBoardProps) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${EDIT_BOARD_URL}/${boardUUID}/contents`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            contents: JSON.stringify(contents),
        }),
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useSaveBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(saveBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boardContent']);
            useDefaultSnackbar('보드가 저장되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 저장에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
    });
}

const getBoardContents = async (boardUUID: string) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${EDIT_BOARD_URL}/${boardUUID}/contents`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useGetBoardContents = (boardUUID: string) => {
    const boardContents = getBoardContents(boardUUID);
    return boardContents;
}

interface searchKeywordInBoardListProps {
    keyword?: string | null,
    size: number,
    pages: number,
}

const searchKeywordInBoardList = async ({keyword, size, pages}: searchKeywordInBoardListProps) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${SEARCH_BOARD_LIST_URL}?page=${pages}&size=${size}&keyword=${keyword}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                return new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useSearchKeywordInBoardList = ({keyword, size, pages}: searchKeywordInBoardListProps) => {
    const boardList = searchKeywordInBoardList({keyword, size, pages});
    return boardList;
}

const fixBoardList = async (boardUUID: string) => {
    const token = localStorage.getItem("token");
    const response = token && await fetch(`${GET_BOARD_URL}/${boardUUID}/fix`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                return new Error(body.resultCode);
            }
        })
    });

    return response;
}

export const useFixBoardList = () => {
    const queryClient = useQueryClient();

    return useMutation(fixBoardList, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('다시 시도해주세요.', 'error');
        },
        useErrorBoundary: false,
    });
}
