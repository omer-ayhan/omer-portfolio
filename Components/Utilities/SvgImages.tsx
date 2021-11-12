import type { FC, ReactElement } from "react";
import { useAppSelector } from "../../context/hooks";

type Props = {
  svgType: "logo" | "intro" | "about" | "colorSet";
};

const SvgImages: FC<Props> = ({ svgType }): ReactElement => {
  const colors = useAppSelector((state) => state.nav);

  const handleSvg = (svgType: string) => {
    switch (svgType) {
      case "logo":
        return (
          <svg
            className="logo"
            width="119"
            height="61"
            viewBox="0 0 119 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M64.7 47C64.5 47 64.33 46.93 64.19 46.79C64.05 46.65 63.98 46.48 63.98 46.28V32.12C63.98 31.92 64.05 31.75 64.19 31.61C64.33 31.47 64.5 31.4 64.7 31.4H67.04C67.24 31.4 67.41 31.47 67.55 31.61C67.69 31.75 67.76 31.92 67.76 32.12V33.14C68.8 31.78 70.25 31.1 72.11 31.1C74.33 31.1 75.88 31.99 76.76 33.77C77.24 32.97 77.92 32.33 78.8 31.85C79.68 31.35 80.63 31.1 81.65 31.1C83.29 31.1 84.63 31.66 85.67 32.78C86.71 33.9 87.23 35.53 87.23 37.67V46.28C87.23 46.48 87.16 46.65 87.02 46.79C86.9 46.93 86.73 47 86.51 47H84.05C83.85 47 83.68 46.93 83.54 46.79C83.4 46.65 83.33 46.48 83.33 46.28V37.91C83.33 36.65 83.06 35.74 82.52 35.18C82 34.6 81.3 34.31 80.42 34.31C79.64 34.31 78.97 34.6 78.41 35.18C77.87 35.76 77.6 36.67 77.6 37.91V46.28C77.6 46.48 77.53 46.65 77.39 46.79C77.25 46.93 77.08 47 76.88 47H74.42C74.22 47 74.05 46.93 73.91 46.79C73.77 46.65 73.7 46.48 73.7 46.28V37.91C73.7 36.65 73.42 35.74 72.86 35.18C72.32 34.6 71.63 34.31 70.79 34.31C69.99 34.31 69.31 34.6 68.75 35.18C68.21 35.76 67.94 36.67 67.94 37.91V46.28C67.94 46.48 67.87 46.65 67.73 46.79C67.59 46.93 67.42 47 67.22 47H64.7ZM97.7703 47.3C95.5503 47.3 93.7803 46.66 92.4603 45.38C91.1603 44.08 90.4703 42.26 90.3903 39.92L90.3603 39.17L90.3903 38.42C90.4903 36.14 91.1903 34.35 92.4903 33.05C93.8103 31.75 95.5703 31.1 97.7703 31.1C100.13 31.1 101.95 31.82 103.23 33.26C104.53 34.7 105.18 36.62 105.18 39.02V39.65C105.18 39.85 105.11 40.02 104.97 40.16C104.83 40.3 104.65 40.37 104.43 40.37H94.4703V40.61C94.5103 41.71 94.8103 42.64 95.3703 43.4C95.9503 44.14 96.7403 44.51 97.7403 44.51C98.9203 44.51 99.8703 44.05 100.59 43.13C100.77 42.91 100.91 42.77 101.01 42.71C101.13 42.65 101.3 42.62 101.52 42.62H104.1C104.28 42.62 104.43 42.68 104.55 42.8C104.69 42.9 104.76 43.03 104.76 43.19C104.76 43.67 104.47 44.24 103.89 44.9C103.33 45.54 102.52 46.1 101.46 46.58C100.4 47.06 99.1703 47.3 97.7703 47.3ZM101.1 37.85V37.76C101.1 36.58 100.8 35.63 100.2 34.91C99.6203 34.19 98.8103 33.83 97.7703 33.83C96.7303 33.83 95.9203 34.19 95.3403 34.91C94.7603 35.63 94.4703 36.58 94.4703 37.76V37.85H101.1ZM109.085 47C108.885 47 108.715 46.93 108.575 46.79C108.435 46.65 108.365 46.48 108.365 46.28V32.15C108.365 31.95 108.435 31.78 108.575 31.64C108.715 31.48 108.885 31.4 109.085 31.4H111.515C111.735 31.4 111.915 31.47 112.055 31.61C112.195 31.75 112.265 31.93 112.265 32.15V33.38C112.745 32.74 113.345 32.25 114.065 31.91C114.805 31.57 115.645 31.4 116.585 31.4H117.815C118.035 31.4 118.205 31.47 118.325 31.61C118.465 31.73 118.535 31.9 118.535 32.12V34.28C118.535 34.48 118.465 34.65 118.325 34.79C118.205 34.93 118.035 35 117.815 35H115.475C114.535 35 113.795 35.27 113.255 35.81C112.715 36.35 112.445 37.09 112.445 38.03V46.28C112.445 46.48 112.375 46.65 112.235 46.79C112.095 46.93 111.915 47 111.695 47H109.085Z"
              fill={colors.Secondary}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.5 61C47.3447 61 61 47.3447 61 30.5C61 25.6311 59.8591 21.0287 57.8301 16.9455C57.3288 17.9722 56.7196 19.0062 56.0295 20.0241C54.3478 22.5045 52.1296 24.972 49.6395 27.1178C47.2538 29.1736 44.5895 30.9591 41.8708 32.1755C40.2869 35.0103 38.1479 37.9897 35.7339 40.6638C32.2465 44.5269 28.042 47.9123 23.9257 49.2276C21.846 49.8921 19.718 50.0497 17.7092 49.3929C15.6861 48.7314 13.9294 47.2911 12.5238 45.0288C9.29635 39.8342 10.4177 33.2509 13.8548 27.9508C17.3075 22.6266 23.2609 18.3002 30.2481 17.5434C30.9345 17.4691 31.5511 17.9652 31.6255 18.6515C31.6998 19.3379 31.2037 19.9545 30.5173 20.0289C24.3881 20.6927 19.0604 24.5185 15.9524 29.311C12.8289 34.1275 12.1099 39.6254 14.6474 43.7094C15.8025 45.5686 17.1217 46.5705 18.4862 47.0167C19.8651 47.4676 21.4366 47.3984 23.1648 46.8462C26.6642 45.728 30.5092 42.7205 33.8782 38.9886C35.4754 37.2193 36.9334 35.323 38.1686 33.4493C36.4086 33.8637 34.646 33.9894 32.9505 33.7228C30.1991 33.2901 28.3795 31.9786 27.8588 29.9379C27.3737 28.037 28.1601 25.9836 29.3995 24.3147C31.8775 20.9778 36.9939 18.0852 42.0789 19.6644C42.8829 19.9141 43.5371 20.3828 43.994 21.0493C44.439 21.6983 44.6469 22.4605 44.7066 23.2377C44.8224 24.7449 44.3989 26.5427 43.6779 28.3967C45.1687 27.4882 46.6295 26.4114 48.0075 25.2239C50.3447 23.2099 52.4119 20.9048 53.9602 18.6211C55.0119 17.0699 55.7993 15.5655 56.2818 14.1969C50.8749 5.66434 41.3489 0 30.5 0C13.6553 0 0 13.6553 0 30.5C0 47.3447 13.6553 61 30.5 61ZM41.3237 27.5525C40.9919 28.3977 40.577 29.2923 40.0903 30.216C37.6843 31.1818 35.3762 31.5735 33.3389 31.2531C31.1499 30.9089 30.4636 30.0347 30.2812 29.3198C30.063 28.4651 30.376 27.1929 31.4066 25.8052C33.4685 23.0286 37.5744 20.8832 41.3375 22.0519C41.6395 22.1457 41.8134 22.2899 41.9321 22.463C42.0626 22.6534 42.1777 22.9571 42.214 23.4292C42.2887 24.4018 42.0077 25.8101 41.3237 27.5525ZM36.446 11.2484C36.4868 12.7005 35.3427 13.9106 33.8907 13.9514C32.4386 13.9922 31.2284 12.8481 31.1877 11.396C31.1469 9.94396 32.291 8.73379 33.7431 8.69303C35.1951 8.65226 36.4053 9.79634 36.446 11.2484ZM43.3558 13.6857C44.8078 13.6449 45.9519 12.4347 45.9112 10.9827C45.8704 9.53063 44.6602 8.38655 43.2082 8.42731C41.7561 8.46808 40.612 9.67825 40.6528 11.1303C40.6936 12.5824 41.9037 13.7264 43.3558 13.6857Z"
              fill={colors.Primary}
            />
          </svg>
        );
      case "colorSet":
        return (
          <svg
            className="nav-icons"
            viewBox="0 0 113 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 55C0 24.6243 24.6243 0 55 0V0V110V110C24.6243 110 0 85.3757 0 55V55Z"
              fill={colors.Primary}
            />
            <path
              d="M113 55C113 24.6243 88.3757 0 58 0H55V110H58C88.3757 110 113 85.3757 113 55V55Z"
              fill={colors.Secondary}
            />
          </svg>
        );
      case "intro":
        return (
          <svg
            id="intro_illustration"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 647 716"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            width="647"
            height="716"
            style={{ backgroundColor: "transparent" }}>
            <path
              id="intro_illustration-path1"
              d="M597.774,368.5C586.274,535,440,585,319.774,603.5C82.9457,603.5,123.823,511.934,157.54,406.58C185.791,318.307,55.9565,234.238,175.573,152.571C295.189,70.904,329.451,191.003,428.631,249.851C539.189,315.451,605.406,258,597.774,368.5Z"
              fill={colors.Secondary}
              stroke="none"
              strokeWidth="1"
            />
            <path
              id="intro_illustration-path2"
              d="M619.397,376.457C633.542,528.2,383.397,610.29,272.397,620.957C75.3965,620.957,158.349,485.18,186.397,397.457C209.896,323.957,101.897,253.957,201.397,185.957C300.897,117.957,329.397,217.957,411.897,266.957C503.862,321.579,608.397,258.457,619.397,376.457Z"
              fill={colors.Primary}
              stroke="none"
              strokeWidth="1"
            />
          </svg>
        );
      case "about":
        return (
          <svg
            id="about_illustration"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 776 675"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            width="776"
            height="675"
            style={{ backgroundColor: "transparent" }}>
            <circle
              id="about_illustration-secondary_shape2"
              r="189"
              transform="matrix(1 0 0 1 320 341)"
              fill={colors.Secondary}
              stroke="none"
              strokeWidth="1"
            />
            <circle
              id="about_illustration-secondary_shape"
              r="189"
              transform="matrix(1 0 0 1 527 401)"
              fill={colors.Secondary}
              stroke="none"
              strokeWidth="1"
            />
            <ellipse
              id="about_illustration-primary_shape"
              rx="261.5"
              ry="254.5"
              transform="matrix(1 0 0 1 408.5 420.5)"
              fill={colors.Primary}
              stroke="none"
              strokeWidth="1"
            />
          </svg>
        );
    }
  };

  return <>{handleSvg(svgType)}</>;
};

export default SvgImages;
