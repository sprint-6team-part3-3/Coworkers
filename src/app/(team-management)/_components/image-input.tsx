"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, memo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import { IMAGE_SIZE_ERROR, IMAGE_TYPE_ERROR } from "@/constants/error-message";
import MAX_IMAGE_SIZE from "@/constants/image-size";
import imageUpload from "@/lib/api/image/image-upload";
import {
  IconEdit,
  IconImageButton,
  IconImageButtonError,
  LoadingSpinner,
} from "@/public/assets/icons";
import { TeamAddEditInput } from "@/types/team-management";

interface ImageInputProps {
  setIsImgLoading: (value: boolean) => void;
}

const ImageInput = memo(({ setIsImgLoading }: ImageInputProps) => {
  const { setValue, resetField, watch } = useFormContext<TeamAddEditInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(watch("image") || null);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (image: File) => imageUpload(image),
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(IMAGE_TYPE_ERROR);
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        setErrorMessage(IMAGE_SIZE_ERROR);
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      setIsImgLoading(true);

      mutate(file, {
        onSuccess: (res) => {
          setImgUrl(res.url);
          setValue("image", res.url);
          setErrorMessage("");
        },
        onError: (error) => {
          setErrorMessage(error.message);
          resetField("image");
          setImgUrl(null);
          e.target.value = "";
        },
        onSettled: () => {
          setIsImgLoading(false);
        },
      });
    }
  };

  return (
    <FieldWrapper label="팀 프로필" id="image" errorMessage={errorMessage}>
      <input
        id="image"
        name="image"
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImage}
      />

      {isPending ? (
        <LoadingSpinner width={66} height={66} />
      ) : (
        <div className="w-70">
          {imgUrl ? (
            <div className="relative size-66">
              <Image
                src={imgUrl}
                alt="팀 프로필 사진"
                fill
                className="rounded-full object-fill"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
              />
              <label htmlFor="image">
                <IconEdit className="absolute -bottom-px -right-px cursor-pointer" />
              </label>
            </div>
          ) : (
            <label htmlFor="image" className="cursor-pointer">
              {errorMessage ? <IconImageButtonError /> : <IconImageButton />}
            </label>
          )}
        </div>
      )}
    </FieldWrapper>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
