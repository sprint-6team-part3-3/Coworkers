"use client";

import { motion, MotionProps as FramerMotionProps } from "framer-motion";
import React, { ReactNode } from "react";

type AnimationType = "slow-appearance";

interface MotionProps extends FramerMotionProps {
  children: ReactNode;
  animation?: AnimationType;
}

const animations: Record<AnimationType, Partial<FramerMotionProps>> = {
  "slow-appearance": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 2 },
  },
};

/**
 * Framer Motion 컴포넌트
 * 서버 컴포넌트에서 framer-motion의 motion을 사용하고 싶을 때 사용하세요.
 * framer-motion을 적용할 곳에 감싸서 사용하면 됩니다.
 * framer-motion motion 속성 전부 사용 가능하며, 자주 쓰는 애니메이션은 animation prop으로 쉽게 사용 가능합니다.
 * @example
 *  <Motion animation="slow-appearance" >
 *    <h1>Hello, Framer Motion!</h1>
 *  </Motion>
 *
 *  <Motion
 *    initial={{ opacity: 0 }}
 *    animate={{ opacity: 1 }}
 *    exit={{ opacity: 0 }}
 *    transition={{ duration: 1 }}
 *  >
 *    <h1>Hello, Framer Motion!</h1>
 *  </Motion>
 *
 * @param children ReactNode
 * @param animation "slow-appearance" | (추가 애니메이션 타입)
 * @param rest framer-motion의 motion 속성 사용 가능
 * @author ☯️채종민
 */
const Motion = ({ children, animation, ...rest }: MotionProps) => {
  const animationProps = animation ? animations[animation] : {};

  return (
    <motion.div className="size-fit" {...animationProps} {...rest}>
      {children}
    </motion.div>
  );
};

export default Motion;
