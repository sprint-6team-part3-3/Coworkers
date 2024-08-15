import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardCommentInput, BoardCommentResponse } from "@/types/board/comment";

import instance from "../axios-instance";

// 댓글 수정 PATCH 요청
const editBoardComment = async (
  commentId: number,
  content: BoardCommentInput,
) => {
  try {
    const res: AxiosResponse<BoardCommentResponse> = await instance.patch(
      `/comments/${commentId}`,
      content,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("로그인 후 댓글 수정이 가능합니다.");
      }
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default editBoardComment;
