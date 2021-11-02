import React from "react";
import Image from "next/image";

interface Props {
  className?: string;
  id?: string;
  path: string;
  alt?: string;
}

export const ImageSSR = ({
  className = "",
  id = "",
  path,
  alt = "",
  ...rest
}: Props) => {
  return (
    <span className={className} id={id}>
      <Image
        src={path}
        layout="fill"
        className={"image-element"}
        alt={alt}
        {...rest}
      />
    </span>
  );
};
