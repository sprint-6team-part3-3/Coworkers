/* eslint-disable no-console */

"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IconButton } from "@/components/common";

interface CommentFormInputs {
  content: string;
}

interface CommentInputProps {
  onAddComment: (content: string) => Promise<void>;
}

const CommentInput = ({ onAddComment }: CommentInputProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CommentFormInputs>();

  const contentValue = watch("content");
  const isContentEmpty = !contentValue || contentValue.trim() === "";

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    try {
      const { content } = data;
      reset();
      await onAddComment(content);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-49 border-y-[0.2px] border-text-disabled"
    >
      <textarea
        placeholder="댓글을 달아주세요"
        className="size-full resize-none overflow-hidden !border-0 bg-background-secondary p-13 placeholder:text-gray-400 focus:!outline-none"
        {...register("content", {
          required: true,
          validate: (value) => value.trim() !== "",
        })}
        disabled={isSubmitting}
      />
      <IconButton
        type="submit"
        icon="IconComment"
        variant={isContentEmpty ? "darkest" : "green"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        disabled={isContentEmpty || isSubmitting}
      />
    </form>
  );
};

export default CommentInput;
