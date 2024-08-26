"use client";

import { setCookie } from "cookies-next";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useToggle } from "@/hooks";
import { IconUser } from "@/public/assets/icons";
import { userAtom } from "@/stores";

import DropDown from "../common/drop-down";
import LogoutComponent from "./logout-component";

const UserDropdown = () => {
  const [user] = useAtom(userAtom);
  const userId = user.id;
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userDropdown = useToggle();

  useEffect(() => {
    if (user.accessToken && !document.cookie.includes("token")) {
      setCookie("token", user.accessToken, { path: "/" });
    }
    if (user.refreshToken && !document.cookie.includes("refreshToken")) {
      setCookie("refreshToken", user.refreshToken, { path: "/" });
    }
    if (user.id && !document.cookie.includes("userId")) {
      setCookie("userId", user.id, { path: "/" });
    }
  }, [user]);

  const openLogout = () => {
    setIsLogoutOpen(true);
    userDropdown.handleOff();
  };

  const closeLogout = () => {
    setIsLogoutOpen(false);
  };

  if (!userId) {
    return (
      <Link href="/login" className="text-text-primary">
        로그인
      </Link>
    );
  }

  return (
    <div className="text-md-medium flex cursor-pointer items-center justify-center whitespace-nowrap text-text-primary">
      <DropDown handleClose={userDropdown.handleOff}>
        <DropDown.Trigger onClick={userDropdown.handleToggle}>
          <div className="flex items-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.nickname}
                width={32}
                height={32}
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
                className="mr-12 rounded-md"
              />
            ) : (
              <IconUser className="mr-12" />
            )}
            <span className="hidden lg:inline">{user.nickname}</span>
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={userDropdown.value}
          position="top-50 right-0 lg:left-0"
        >
          <Link href="/user/history">
            <DropDown.Item onClick={userDropdown.handleToggle}>
              마이 히스토리
            </DropDown.Item>
          </Link>
          <Link href="/user-setting">
            <DropDown.Item onClick={userDropdown.handleToggle}>
              계정 설정
            </DropDown.Item>
          </Link>
          <DropDown.Item onClick={openLogout}>로그아웃</DropDown.Item>
        </DropDown.Menu>
      </DropDown>
      <LogoutComponent isOpen={isLogoutOpen} onClose={closeLogout} />
    </div>
  );
};

export default UserDropdown;
