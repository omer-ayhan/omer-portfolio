import React, { ElementType } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

interface Props {
  className?: string;
  id?: string;
  path: string;
  alt?: string;
  sx?: object;
  objectFit?: "cover" | "contain" | "fill";
  comp?: ElementType<any>;
}

export const ImageSSR = ({
  className = "",
  id = "",
  path,
  alt = "",
  sx = {},
  comp = "span",
  ...rest
}: Props) => {
  return (
    <Box component={comp} className={className} id={id} sx={{ ...sx }}>
      <Image
        src={path}
        layout="fill"
        className={"image-element"}
        alt={alt}
        {...rest}
      />
    </Box>
  );
};
