import { useCallback, useState } from "react";
import { Link, Typography } from "@mui/material";
import styles from "./Projects.style";

interface Props {
  text: string;
}

const Truncation = ({ text }: Props) => {
  const [showText, setShowText] = useState(false);

  const handleShowtext = () => setShowText(!showText);

  const truncate = useCallback(() => {
    if (text.length > 99) {
      if (showText) {
        return (
          <>
            {text}{" "}
            <Link
              component="button"
              onClick={handleShowtext}
              color="primary"
              sx={styles.card.text.desc}>
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
              onClick={handleShowtext}
              sx={styles.card.text.desc}>
              Show {showText ? "Less" : "More"}
            </Link>
          </>
        );
      }
    } else return <>{text}</>;
  }, [showText, text]);

  return (
    <Typography variant="body1" textAlign="start" sx={styles.card.text.desc}>
      {truncate()}
    </Typography>
  );
};

export default Truncation;
