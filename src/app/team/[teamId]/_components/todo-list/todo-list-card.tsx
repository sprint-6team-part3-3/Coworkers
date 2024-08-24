import Link from "next/link";

import { ToolTip } from "@/components/common";
import { IconDoneCyan } from "@/public/assets/icons";
import { GroupTask, TaskList } from "@/types/group";
import groupTaskTodoList from "@/utils/group-task-todo-list";

import ProgressSign from "./progress-sign";
import TodoListDropDown from "./todo-list-drop-down";

interface TodoListCardProps {
  color?: "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow";
  children: string;
  link: string;
  tasks: TaskList[];
  task: GroupTask;
}

function getColorClass(color: TodoListCardProps["color"]) {
  if (color === "purple") return "bg-point-purple";
  if (color === "blue") return "bg-point-blue";
  if (color === "green") return "bg-point-green";
  if (color === "pink") return "bg-point-pink";
  if (color === "rose") return "bg-point-rose";
  if (color === "orange") return "bg-point-orange";
  if (color === "yellow") return "bg-point-yellow";
  return "bg-point-purple";
}

const TodoListCard = ({
  children,
  color,
  link,
  tasks,
  task,
}: TodoListCardProps) => {
  const colorClass = getColorClass(color);
  const { totalItems, completedItems, CHECKED_ITEMS } =
    groupTaskTodoList(tasks);
  return (
    <div className="relative my-10 flex h-40 items-center rounded-12 bg-background-secondary pl-24 pr-12 text-16-500">
      <Link
        href={link}
        className="group z-0 flex flex-1 items-center justify-between"
      >
        <div
          className={`absolute left-0 h-40 w-12 rounded-l-12 ${colorClass}`}
        />
        <ToolTip message="목록을 클릭하여 투두리스트 관리하기" position="right">
          <span className="group-hover text-14-500">{children}</span>
        </ToolTip>
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 rounded-full bg-background-primary px-8 py-4">
          {totalItems === completedItems ? (
            <IconDoneCyan />
          ) : (
            <ProgressSign checkedItem={CHECKED_ITEMS} />
          )}
          <span className="text-14-400 text-brand-primary">
            {completedItems}&#47;{totalItems}
          </span>
        </div>
        <TodoListDropDown task={task} />
      </div>
    </div>
  );
};

export default TodoListCard;
