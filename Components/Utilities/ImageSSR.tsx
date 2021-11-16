import type { ElementType } from "react";
import { useMemo } from "react";
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
  priorty?: boolean;
}

const ImageSSR = ({
  className = "",
  id = "",
  path,
  alt = "",
  sx = {},
  comp = "span",
  objectFit = "cover",
  priorty = false,
}: Props) => {
  return useMemo(
    () => (
      <Box component={comp} className={className} id={id} sx={{ ...sx }}>
        <Image
          src={path}
          layout="fill"
          className="image-element"
          alt={alt}
          objectFit={objectFit}
          priority={priorty}
        />
      </Box>
    ),
    [className, id, path, alt, comp, objectFit, priorty]
  );
};

export default ImageSSR;
