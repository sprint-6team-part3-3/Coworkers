"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useToggle } from "@/hooks";
import { IconProfileCurrent, IconUserX } from "@/public/assets/icons";
import { userAtom } from "@/stores";
import { GroupMember } from "@/types/user";

import DeleteMemberModal from "./delete-member-modal";
import ProfileModal from "./profile-modal";

interface MemberCardProps {
  member: GroupMember;
  adminId: number;
  teamName: string;
}

const Card = ({ member, adminId, teamName }: MemberCardProps) => {
  const [isClient, setIsClient] = useState(false);
  const [user] = useAtom(userAtom);
  const {
    value: isProfileModalOpen,
    handleOn: openProfileModal,
    handleOff: closeProfileModal,
  } = useToggle();
  const {
    value: isDeleteModalOpen,
    handleOn: openDeleteModal,
    handleOff: closeDeleteModal,
  } = useToggle();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="rounded-16 bg-background-secondary px-16 py-12  md:px-20 md:py-16 lg:px-24 lg:py-20">
      {/* PC, 테블릿 */}
      <div className="hidden items-center justify-between md:flex">
        <div
          onClick={openProfileModal}
          className="group flex cursor-pointer items-center gap-12"
        >
          <div className="relative size-28 flex-1 lg:size-32">
            {member.userImage && member.userImage !== "Invalid Date" ? (
              <Image
                fill
                src={member.userImage}
                alt={`${member.userName}프로필 사진`}
                className="rounded-full object-cover"
              />
            ) : (
              <IconProfileCurrent
                width={28}
                height={28}
                className="size-28 lg:size-32"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <span className="group-hover text-14-700">{member.userName}</span>
              {member.role === "ADMIN" && (
                <span className="text-12-400 text-brand-secondary">
                  (관리자)
                </span>
              )}
            </div>
            <span className="group-hover text-12-400 text-text-secondary">
              {member.userEmail}
            </span>
          </div>
        </div>
        {(user.id === member.userId || user.id === adminId) &&
          member.userId !== adminId &&
          isClient && (
            <IconUserX
              onClick={openDeleteModal}
              className="cursor-pointer hover:stroke-red-700"
            />
          )}
      </div>
      {/* 모바일 */}
      <div className="flex items-center justify-between md:hidden">
        <div onClick={openProfileModal} className="group cursor-pointer">
          <div className="flex items-center gap-6">
            <div className="relative size-24">
              {member.userImage && member.userImage !== "Invalid Date" ? (
                <Image
                  fill
                  src={member.userImage}
                  alt={`${member.userName}프로필 사진`}
                  className="rounded-full object-cover"
                />
              ) : (
                <IconProfileCurrent width={24} height={24} />
              )}
            </div>
            <span className="group-hover text-14-700">{member.userName}</span>
            {member.role === "ADMIN" && (
              <span className="text-12-400 text-brand-secondary">(관리자)</span>
            )}
          </div>
          <span className="group-hover text-12-400 text-text-secondary">
            {member.userEmail}
          </span>
        </div>
        {(user.id === member.userId || user.id === adminId) &&
          member.userId !== adminId &&
          isClient && (
            <IconUserX onClick={openDeleteModal} className="cursor-pointer" />
          )}
      </div>
      {isProfileModalOpen && (
        <ProfileModal
          teamName={teamName}
          member={member}
          onClose={closeProfileModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          userId={user.id}
          memberId={member.userId}
          memberName={member.userName}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default Card;
