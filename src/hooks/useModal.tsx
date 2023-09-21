import { useAtom } from "jotai";
import { useCallback } from "react";

import modalAtom from "@/state/modalAtom";

import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";
import LoginModalElement from "@/components/atoms/Modal/LoginModalElement";
import UserDeleteModalElement from "@/components/atoms/Modal/UserDeleteModalElement";
import ScrapDeleteElementModal from "@/components/atoms/Modal/ScrapDeleteModalElement";
import ScrapEditModalElement from "@/components/atoms/Modal/ScrapEditModalElement";
import ScrapCreateModalElement from "@/components/atoms/Modal/ScrapCreateModalElement";

export const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        setModal((prev) => { return { ...prev, isOpen: false } })
    }, [setModal]);

    const modalTypeMatching = {
        memoCreate: {
            title: '메모 추가하기',
            element: <MemoCreateModalElement />,
        },
        login: {
            title: '소셜 로그인하기',
            element: <LoginModalElement />,
        },
        userDelete: {
            title: '회원 탈퇴하기',
            element: <UserDeleteModalElement />,
        },
        scrapDelete: {
            title: '스크랩 삭제하기',
            element: <ScrapDeleteElementModal />,
        },
        scrapEdit: {
            title: '스크랩 편집하기',
            element: <ScrapEditModalElement />,
        },
        scrapCreate: {
            title: '스크랩 추가하기',
            element: <ScrapCreateModalElement />,
        }
    }

    const connectMemoWithScrapId = useCallback((scrapId: number) => {
        setModal((prev) => {
            return { ...prev, scrapId: scrapId }
        })
    }, [setModal, modal]);

    const openModal = useCallback((
        type: string
    ) => {
        setModal((prev) => {
            return {
                ...prev,
                ...modalTypeMatching[type as keyof typeof modalTypeMatching],
                isOpen: true,
            }
        })
    }, [setModal]);

    return { modal, closeModal, openModal, connectMemoWithScrapId };
}
