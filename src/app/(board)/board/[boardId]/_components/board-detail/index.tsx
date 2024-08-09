import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/common";
import { IconHeart, IconProfile } from "@/public/assets/icons";
import { BoardResponse } from "@/types/board";
import formatBoardDate from "@/utils/format-board-date";

import BoardDropDown from "./board-drop-down";

interface BoardDetailProps {
  boardData: BoardResponse;
  userId: number;
  boardId: number;
}

const BoardDetail = ({ boardData, userId, boardId }: BoardDetailProps) => {
  const parsedContent = JSON.parse(boardData.content);

  return (
    <article className="mt-56">
      <div className="flex items-center justify-between">
        <h1 className="text-20-500 text-text-secondary md:text-24-500">
          {boardData.title}
        </h1>
        {userId === boardData.writer.id && <BoardDropDown boardId={boardId} />}
      </div>

      <div className="my-16 h-1 w-full bg-border-primary/10" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 text-12-500 md:text-14-500">
          {/** FIXME: 작성자의 프로필 사진이 API에 없음 */}
          <IconProfile />
          <span>{boardData.writer.nickname}</span>
          <div className="h-12 w-1 bg-background-tertiary" />
          <time
            className="text-text-disabled"
            dateTime={formatBoardDate(boardData.createdAt)}
          >
            {formatBoardDate(boardData.createdAt)}
          </time>
          {boardData.createdAt !== boardData.updatedAt && (
            <span className="text-text-default">(수정됨)</span>
          )}
        </div>
        <div className="flex items-center gap-8 text-12-400 text-text-disabled md:text-14-400">
          <div className="flex gap-4">
            <IconHeart />
            <span>{boardData.likeCount}</span>
          </div>
        </div>
      </div>

      {boardData.image && (
        <div className="mt-40 flex">
          <Image
            alt="게시물 이미지"
            src={boardData.image}
            width={350}
            height={350}
            className="rounded-10"
          />
        </div>
      )}

      <p className="my-40 whitespace-pre-line text-14-400 leading-[24px] text-text-secondary md:text-16-400 md:leading-[28px]">
        {parsedContent.content}
      </p>

      <div className="mb-24 flex justify-center">
        <Link href="/boards">
          <Button
            className="h-36 w-100 text-14 md:h-48 md:w-120 md:text-16"
            variant="noFill"
          >
            목록으로
          </Button>
        </Link>
      </div>
    </article>
  );
};
export default BoardDetail;
