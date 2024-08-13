import Link from "next/link";
import { useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconDoneCyan } from "@/public/assets/icons";
import { GroupTask, TaskList } from "@/types/group";
import groupTaskTodoList from "@/utils/group-task-todo-list";

import DeleteTaskListModal from "./delete-todo-list-modal";
import EditTodoListModal from "./edit-todo-list-modal";
import ProgressSign from "./progress-sign";

interface TodoListCardProps {
  color?: "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow";
  children: string;
  link: string;
  tasks: TaskList[];
  task: GroupTask;
}

type TodoListDropDownProps = {
  groupId: number;
  id: number;
  name: string;
};

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

const TodoListDropDown = ({ groupId, id, name }: TodoListDropDownProps) => {
  const { value, handleOff, handleToggle } = useToggle();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    handleOff();
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
    handleOff();
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconButton icon="IconKebab" variant="none" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value} className="z-50">
        <DropDown.Item>
          <div onClick={openEditModal}>수정하기</div>
        </DropDown.Item>
        <DropDown.Item>
          <div onClick={openDeleteModal}>삭제하기</div>
        </DropDown.Item>
      </DropDown.Menu>
      {isDeleteModalOpen && (
        <DeleteTaskListModal
          onClose={closeDeleteModal}
          groupId={groupId}
          id={id}
          name={name}
        />
      )}
      {isEditModalOpen && (
        <EditTodoListModal
          onClose={closeEditModal}
          groupId={groupId}
          id={id}
          name={name}
        />
      )}
    </DropDown>
  );
};

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
    <div className="relative my-10 flex h-40 items-center rounded-12 bg-background-secondary pl-24 pr-30 text-16-500">
      <div className={`absolute left-0 h-40 w-12 rounded-l-12 ${colorClass}`} />
      <Link
        href={link}
        className="z-2 flex flex-1 items-center justify-between"
      >
        <span className="text-14-500">{children}</span>
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
      </Link>
      <div className="absolute right-10">
        <TodoListDropDown
          name={task.name}
          groupId={task.groupId}
          id={task.id}
        />
      </div>
    </div>
  );
};

export default TodoListCard;
