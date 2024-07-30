import { clsx } from "clsx";
import { ComponentProps } from "react";

import { IconCheckCurrent } from "@/public/assets/icons";

import FloatButton from "../float-button";

interface CheckButtonProps extends ComponentProps<"button"> {
  children: string;
  variant: "primary" | "white";
}

/**
 * 
 * 완성된 체크 아이콘 브랜드 버튼입니다.
 * 버튼 글자만 children으로 주어서 사용하면 됩니다.
 * variant에 따라 디자인이 적용됩니다.
 * button attributes 모두 사용 가능합니다.
 * @example
 *  <CheckButton variant="primary" onClick={() => {}}>
        완료하기
    </CheckButton>

    <CheckButton variant="white" onClick={() => {}}>
        완료 취소하기
    </CheckButton>
  * @param children 버튼 안에 들어갈 글자
  * @param variant 
  *   "primary"(primary 배경색+하얀 글자) | 
  *   "white"(하얀 배경색+primary 글자 ) | 
  * @param rest onClick,type 등 버튼 속성 사용 가능
  * @author ☯️채종민
  */

const CheckButton = ({ children, variant, ...rest }: CheckButtonProps) => (
  <FloatButton
    Icon={
      <IconCheckCurrent
        className={clsx({
          "stroke-white": variant === "primary",
          "stroke-brand-primary group-hover:stroke-interaction-hover group-disabled:stroke-interaction-inactive":
            variant === "white",
        })}
      />
    }
    variant={variant}
    className={clsx("group size-fit text-14-600", {
      "px-21 py-[11.5px]": variant === "primary",
      "px-20 py-[10.5px]": variant === "white",
    })}
    {...rest}
  >
    {children}
  </FloatButton>
);

export default CheckButton;
