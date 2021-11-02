import * as React from "react";
import { animateScroll } from "./animateScroll";

const logError = () =>
  console.error(
    "Invalid element, please make sure you provided an id or react ref"
  );

const getElementPosition = (element: HTMLElement) => element.offsetTop;

interface Props {
  id?: string;
  ref?: React.RefObject<HTMLElement> | null;
  duration?: number;
}

export const scrollTo = ({ id, ref = null, duration = 3000 }: Props) => {
  const initialPosition = window.scrollY;

  const element = ref ? ref.current : id ? document.getElementById(id) : null;

  if (!element) {
    logError();
    return;
  }

  animateScroll({
    targetPosition: getElementPosition(element),
    initialPosition,
    duration,
  });
};
