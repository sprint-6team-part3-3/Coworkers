"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, TextArea } from "@/components/common";
import { NewTaskForm } from "@/types/task-list";

const DescriptionInput = () => {
  const { register, watch } = useFormContext<NewTaskForm>();
  return (
    <FieldWrapper id="description" label="메모">
      <TextArea
        id="description"
        placeholder="메모를 입력해 주세요"
        rows={7}
        {...register("description")}
      />
    </FieldWrapper>
  );
};

export default DescriptionInput;
