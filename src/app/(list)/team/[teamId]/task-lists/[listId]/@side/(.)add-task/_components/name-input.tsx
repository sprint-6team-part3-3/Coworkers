"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { NewTaskForm } from "@/types/task-list";

const NameInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewTaskForm>();
  return (
    <FieldWrapper id="name" label="제목" errorMessage={errors.name?.message}>
      <Input
        id="name"
        type="text"
        placeholder="할일 제목을 지어주세요"
        {...register("name")}
        isError={!!errors.name}
      />
    </FieldWrapper>
  );
};

export default NameInput;
