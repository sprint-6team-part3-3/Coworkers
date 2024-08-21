"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { AddListModalButton } from "@/components/common";
import { GroupTask } from "@/types/group";

import DragAndDrop from "./drag-and-drop";

interface TodoLostBoxProps {
  taskList: GroupTask[];
  teamId: number;
}

const TodoListBox = ({ taskList, teamId }: TodoLostBoxProps) => {
  const [todoListIndex, setTodoListIndex] = useState(taskList);
  const queryClient = useQueryClient();
  const taskListsNav = todoListIndex.map(({ id, name }) => ({
    id,
    name,
  }));
  queryClient.setQueryData(["task-lists", teamId], taskListsNav);

  useEffect(() => {
    sessionStorage.setItem(
      `task-lists-${teamId}`,
      JSON.stringify(taskListsNav),
    );
  }, [taskListsNav, teamId]);

  const handleAddTask = (newTask: GroupTask) => {
    setTodoListIndex((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (updatedTask: GroupTask) => {
    setTodoListIndex((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleDeleteTask = (taskToDelete: GroupTask) => {
    setTodoListIndex((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id),
    );
  };

  const divRef = useRef<HTMLDivElement>(null);

  const handleDivClick = () => {
    const button = divRef.current?.querySelector("button");
    if (button) {
      button.click();
    }
  };

  return (
    <article className="m-auto w-full">
      <div className="flex justify-between">
        <div className="flex h-21 items-center gap-8">
          <h3 className="text-16-500">할 일 목록</h3>
          <span className="text-14-500 text-text-default">
            목록을 클릭하여 투두리스트를 관리해요
          </span>
        </div>
      </div>
      <section>
        {todoListIndex.length > 0 && (
          <DragAndDrop
            todoListIndex={todoListIndex}
            teamId={teamId}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            setTodoListIndex={setTodoListIndex}
          />
        )}
      </section>
      <div
        ref={divRef}
        className="mt-12 flex h-46 cursor-pointer items-center gap-4 rounded-12 border-4 border-dotted border-background-tertiary px-12 hover:bg-background-secondary/50"
        onClick={handleDivClick}
      >
        <AddListModalButton groupId={teamId} onAddTask={handleAddTask} />
      </div>
    </article>
  );
};

export default TodoListBox;
