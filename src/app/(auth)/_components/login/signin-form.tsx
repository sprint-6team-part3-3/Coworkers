"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, FloatButton, Input } from "@/components/common";
import {
  GOOGLE_AUTHORIZE_URL,
  KAKAO_AUTHORIZE_URL,
} from "@/constants/auth-url";
import { useToast } from "@/hooks";
import signIn from "@/lib/api/auth/sign-in";
import { loginSchema } from "@/lib/schemas/auth";
import { LoadingSpinner } from "@/public/assets/icons";
import { ImgGoogle, ImgKakao } from "@/public/assets/images";
import { pwLengthAtom, userAtom } from "@/stores";
import { SignInInput } from "@/types/auth";
import randomString from "@/utils/random-string";

import ResetPasswordComponent from "../reset-password/reset-password-component";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const [, setPwLength] = useAtom(pwLengthAtom);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    const passwordLength = password.length;

    try {
      const resData = await signIn(email, password);

      if (!resData.success) {
        error(`${resData.data?.message}`);
      } else {
        success("로그인 성공");

        setUser({
          id: resData.data.user.id,
          nickname: resData.data.user.nickname,
          createdAt: resData.data.user.createdAt,
          updatedAt: resData.data.user.updatedAt,
          image: resData.data.user.image,
          teamId: resData.data.user.teamId,
          email: resData.data.user.email,
          accessToken: resData.data.accessToken,
          refreshToken: resData.data.refreshToken,
          loginType: null,
        });

        setPwLength(passwordLength);

        queryClient.invalidateQueries({ queryKey: ["userData"] });

        router.push("/");
      }
    } catch (err) {
      error("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetClick = () => {
    setIsOpen(true);
  };

  const handleKakaoLogin = () => {
    const state = randomString(10);
    const KAKAO_LOGIN_URL = `${KAKAO_AUTHORIZE_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&scope=profile_nickname,profile_image&state=${state}`;
    window.location.replace(KAKAO_LOGIN_URL);
  };

  const handleGoogleLogin = () => {
    const state = randomString(10);
    const GOOGLE_LOGIN_URL = `${GOOGLE_AUTHORIZE_URL}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email&state=${state}`;
    window.location.replace(GOOGLE_LOGIN_URL);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-80 w-315 md:w-470">
        <p className="mb-80 flex justify-center text-24 font-medium text-text-primary lg:text-40">
          로그인
        </p>
        <FieldWrapper
          id="email"
          label="이메일"
          errorMessage={errors.email?.message || ""}
        >
          <Input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
            isError={!!errors.email}
          />
        </FieldWrapper>
        <div className="mt-24">
          <FieldWrapper
            id="password"
            label="비밀번호"
            errorMessage={errors.password?.message || ""}
          >
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
              isError={!!errors.password}
            />
          </FieldWrapper>
          <div className="mt-12 text-right">
            <button
              type="button"
              className="text-16-500 text-brand-primary underline"
              onClick={handlePasswordResetClick}
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </div>
        {isLoading ? (
          <FloatButton
            Icon={<LoadingSpinner width={30} height={30} />}
            disabled
            variant="primary"
            className="mt-40 h-47 w-full"
          >
            처리 중...
          </FloatButton>
        ) : (
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            className="mt-40 h-47 w-full"
          >
            로그인
          </Button>
        )}
        <div className="flex justify-center">
          <p className="mt-24">
            아직 계정이 없으신가요?
            <Link
              href="/sign-up"
              className="ml-12 text-brand-primary underline"
            >
              가입하기
            </Link>
          </p>
        </div>
        <div className="mt-48 flex w-full items-center">
          <hr className="flex-1 border-t border-border-primary" />
          <span className="mx-24 text-16-400">OR</span>
          <hr className="flex-1 border-t border-border-primary" />
        </div>
        <div className="mt-16 flex w-full justify-between">
          <p className=" text-16-500">간편 로그인하기</p>
          <div className="flex gap-4">
            <button
              type="button"
              className="flex size-42 items-center justify-center rounded"
              onClick={handleGoogleLogin}
            >
              <Image src={ImgGoogle} alt="Google" />
            </button>
            <button
              type="button"
              className="ml-16 flex size-42 items-center justify-center rounded"
              onClick={handleKakaoLogin}
            >
              <Image src={ImgKakao} alt="Kakao" />
            </button>
          </div>
        </div>
      </form>
      <ResetPasswordComponent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default SignInForm;
