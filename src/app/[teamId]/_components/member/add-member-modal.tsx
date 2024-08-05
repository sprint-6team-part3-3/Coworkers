"use client";

import { Button, Drawer, Modal } from "@/components/common";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import { IconPlusCurrent } from "@/public/assets/icons";

const AddMemberModal = () => {
  const { value: isOpen, handleOn, handleOff } = useToggle();
  const toast = useToast();
  const isMobile = useIsMobile();

  const handleClickCopy = () => {
    // TODO: 링크 생성해서 복사하기
    toast.success("링크가 복사되었습니다.");
    handleOff();
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <>
      <div
        onClick={handleOn}
        className="flex h-72 cursor-pointer items-center gap-4 rounded-16 border-4 border-dotted border-background-tertiary px-16 py-12 text-16-700 text-brand-primary hover:bg-background-secondary/50 md:h-auto  md:px-20 md:py-16 lg:px-24 lg:py-20"
      >
        <IconPlusCurrent stroke="#22b8cf" />
        멤버 추가하기
      </div>

      {isOpen && (
        <ModalComponent
          showCloseButton
          onClose={handleOff}
          title="멤버 초대"
          description="그룹에 참여할 수 있는 링크를 복사합니다."
        >
          <Button
            onClick={handleClickCopy}
            variant="primary"
            className="mt-16 h-47 w-full"
          >
            복사하기
          </Button>
        </ModalComponent>
      )}
    </>
  );
};

export default AddMemberModal;
