import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/common";

import BoardListInfo from "./_components/board-list-info";
import CarouselItems from "./_components/carousel/carouselItems";

export const metadata: Metadata = {
  title: "자유게시판",
  description: "같이 일정관리 할 팀원들을 모집해요",
};

const BoardPage = () => {
  const userCookie = cookies().get("userId");

  return (
    <div className="mt-40 flex flex-col gap-40">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 sm:flex-col md:items-center md:gap-16">
          <h1 className="text-24-700">자유게시판</h1>
          <p className="text-14-500 text-text-disabled">
            같이 일정관리 할 팀원들을 모집해봐요
          </p>
        </div>

        {userCookie?.value && (
          <Link href="/create-board">
            <Button
              className="h-40 w-100 border-2 md:w-110 lg:h-45 lg:w-130"
              variant="noFill"
            >
              게시글 작성
            </Button>
          </Link>
        )}
      </div>

      <CarouselItems />

      <BoardListInfo />
    </div>
  );
};

export default BoardPage;
