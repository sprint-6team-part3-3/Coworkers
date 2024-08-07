"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { FieldWrapper, Input, PlusButton, TextArea } from "@/components/common";
import newTaskSchema from "@/lib/schemas/task";
import { NewTask } from "@/types/task-list";
import convertStringArrayToNumberArray from "@/utils/convert-string-array-to-num";

import RepeatInput from "./repeat-input";
import RepeatSign from "./repeat-sign";
import WeeklyOption from "./weekly-option";

interface AddTaskFormProps {
  currentTeamId: number;
  initialDate: number;
  initialDay: number;
  currentListId: number;
}

const AddTaskForm = ({
  currentTeamId,
  initialDate,
  initialDay,
  currentListId,
}: AddTaskFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NewTask>({
    resolver: zodResolver(newTaskSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      monthDay: initialDate,
    },
  });
  const selectedRepeat = watch("frequencyType");

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    let numTypeWeekDays: number[];
    // data.monthlyDay number type으로 바꿔서 쏴야함
    if (data.frequencyType === "WEEKLY" && Array.isArray(data.weekDays)) {
      numTypeWeekDays = convertStringArrayToNumberArray(data.weekDays);
    }
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-30 flex flex-col justify-between pb-30"
    >
      <div className="flex flex-col gap-40">
        <div>
          <FieldWrapper
            id="name"
            label="제목"
            errorMessage={errors.name?.message}
          >
            <Input
              id="name"
              type="text"
              placeholder="할일 제목을 지어주세요"
              {...register("name")}
              isError={!!errors.name}
            />
          </FieldWrapper>
        </div>
        <FieldWrapper id="description" label="메모">
          <TextArea
            id="description"
            placeholder="메모를 입력해 주세요"
            rows={7}
            {...register("description")}
          />
        </FieldWrapper>
        <RepeatInput {...register("frequencyType")} />
        {selectedRepeat === "WEEKLY" ? (
          <WeeklyOption
            register={register("weekDays")}
            defaultCheckDay={initialDay}
          />
        ) : (
          <RepeatSign repeatOption={selectedRepeat} MonthlyDate={initialDate} />
        )}
      </div>
      <div className="mt-130 flex justify-end pb-20">
        <PlusButton type="submit" onClick={() => {}} disabled={!isValid}>
          할 일 추가
        </PlusButton>
      </div>
    </form>
  );
};

export default AddTaskForm;
