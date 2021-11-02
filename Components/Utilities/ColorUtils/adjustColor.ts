import { props } from "../StylesProvider";
const { colors } = props;

const trimHex = (h: string): string =>
  h.charAt(0) === "#" ? h.replace(/([^0-9A-F]+)/gi, "").substr(0, 6) : h;
const hexToR = (h: string): number => parseInt(trimHex(h).substring(0, 2), 16);
const hexToG = (h: string): number => parseInt(trimHex(h).substring(2, 4), 16);
const hexToB = (h: string): number => parseInt(trimHex(h).substring(4, 6), 16);

const adjustTextColor = (hex: string, threshold = 184) => {
  let hexRed = hexToR(hex);
  let hexGreen = hexToG(hex);
  let hexBlue = hexToB(hex);

  const colorBrightness =
    (hexRed * 299 + hexGreen * 587 + hexBlue * 114) / 1000;

  return colorBrightness >= threshold ? colors.Darkdef : "#fff";
};

const adjustColorShade = (color: string, shade: number) =>
  `#${color
    .replace(/^#/, "")
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + shade)).toString(
        16
      )}`.substr(-2)
    )}`;

export { adjustTextColor, adjustColorShade };
