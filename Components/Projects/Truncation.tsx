import React from "react";
import { Link, Typography } from "@mui/material";
import { props } from "../Utilities/StylesProvider";

interface Props {
  text: string;
}

const Truncation = ({ text }: Props) => {
  const [showText, setShowText] = React.useState(false);
  const { stylesAll } = props;

  const truncate = () => {
    if (text.length > 99) {
      if (showText) {
        return (
          <>
            {text}{" "}
            <Link
              component="button"
              onClick={() => setShowText(!showText)}
              sx={{
                ...stylesAll.projects.card.text.desc,
                color: "primary",
              }}>
              Show {showText ? "Less" : "More"}
            </Link>
          </>
        );
      } else {
        return (
          <>
            {text.substring(0, 87)}...{" "}
            <Link
              component="button"
              color="primary"
              onClick={() => setShowText(!showText)}
              sx={{
                ...stylesAll.projects.card.text.desc,
                color: "primary",
              }}>
              Show {showText ? "Less" : "More"}
            </Link>
          </>
        );
      }
    } else return <>{text}</>;
  };

  return (
    <Typography
      variant="body1"
      sx={{
        ...stylesAll.projects.card.text.desc,
        textAlign: "start",
      }}>
      {truncate()}
    </Typography>
  );
};

export default Truncation;
