"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  FieldWrapper,
  FloatButton,
  Input,
  ToolTip,
} from "@/components/common";
import { useToast } from "@/hooks";
import acceptInvitation from "@/lib/api/group/accept-invitation";
import { teamJoinSchema } from "@/lib/schemas/team-manage";
import { LoadingSpinner } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { InvitationRequestType, TeamJoinInput } from "@/types/team-management";

const JoinTeamForm = () => {
  const [user] = useAtom(userAtom);
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TeamJoinInput>({
    resolver: zodResolver(teamJoinSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: InvitationRequestType) => acceptInvitation(data),
  });

  const handleSubmitJoinForm: SubmitHandler<TeamJoinInput> = (data) => {
    const submitData: InvitationRequestType = {
      token: data.token,
      userEmail: user.email,
    };

    mutate(submitData, {
      onSuccess: () => {
        router.replace(`/my-teams`);
        toast.success("새로운 팀에 참여되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["userData"] });
        queryClient.invalidateQueries({ queryKey: ["userGroups"] });
      },
      onError: (error) => {
        toast.error(error.message);
        reset();
      },
    });
  };

  return (
    <form
      className="relative my-24 flex w-full flex-col gap-24"
      onSubmit={handleSubmit(handleSubmitJoinForm)}
    >
      <FieldWrapper
        label="팀 참여 토큰"
        id="token"
        errorMessage={errors.token?.message || ""}
      >
        <span className="absolute right-0 top-1 text-14-500 text-brand-primary/70">
          <ToolTip message="모집게시판 게시글을 확인하세요!">
            <span className="cursor-pointer ">
              팀 참여 토큰은 어디서 얻나요?
            </span>
          </ToolTip>
        </span>

        <Input
          {...register("token", {
            required: true,
          })}
          id="token"
          placeholder="팀 참여 토큰을 입력해주세요."
          isError={!!errors.token}
        />
      </FieldWrapper>
      {isPending ? (
        <FloatButton
          variant="primary"
          disabled
          className="mt-16 h-47 w-full"
          Icon={<LoadingSpinner width={30} height={30} />}
        >
          참여중
        </FloatButton>
      ) : (
        <Button
          disabled={!isValid}
          type="submit"
          variant="primary"
          className="mt-16 h-47 w-full"
        >
          참여하기
        </Button>
      )}
    </form>
  );
};

export default JoinTeamForm;
