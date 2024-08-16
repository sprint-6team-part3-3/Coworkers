import { Suspense } from "react";

import PageLoading from "@/components/loading";
import getGroupData from "@/lib/api/group/get-group-data";
import { GroupResponse } from "@/types/group";

import Empty from "./_components/empty";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";

const TeamPage = async ({ params }: { params: { teamId: number } }) => {
  const { teamId } = params;

  try {
    const response: GroupResponse = await getGroupData(teamId);

    if (!response) {
      return <Empty />;
    }

    return (
      <Suspense fallback={<PageLoading />}>
        <TeamCardBox teamName={response.name} teamId={teamId} />
        <TodoListBox taskList={response.taskLists} teamId={teamId} />
        <ReportBox taskList={response.taskLists} />
        <MemberBox memberList={response.members} />
      </Suspense>
    );
  } catch {
    throw new Error("팀 페이지를 가져오는데 실패하였습니다.");
  }
};

export default TeamPage;
