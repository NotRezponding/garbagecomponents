import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
} from "react";

import styles from "./styles.module.css";

const Media: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactElement;
    shadow?: boolean;
    zoomLevel?: number;
    perspective?: string;
  }
> = ({ children, shadow, zoomLevel, perspective, ...allProps }) => {
  const imageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    zoomLevel &&
      containerRef.current?.style.setProperty(`--zoomLevel`, `${zoomLevel}`);
    perspective &&
      containerRef.current?.style.setProperty(
        `--perspective`,
        `${perspective}`
      );
  }, []);

  return (
    <div
      {...allProps}
      ref={containerRef}
      className={`${styles.perspective} ${
        allProps?.className ? allProps?.className : ""
      }`}
      onMouseMove={(e) => {
        allProps?.onMouseMove ? allProps?.onMouseMove(e) : null;
        const maxY = 15;
        const maxX = 15;

        const maxB = 1.5;
        const minB = 0.75;

        const width = e.currentTarget.getBoundingClientRect().width;
        const height = e.currentTarget.getBoundingClientRect().height;
        const top = e.currentTarget.getBoundingClientRect().top;
        const left = e.currentTarget.getBoundingClientRect().left;
        const topPos = e.clientY - top;
        const leftPos = e.clientX - left;

        const leftCenter = width / 2;
        const topCenter = height / 2;

        const leftPosFromCenter = leftPos - leftCenter;
        const topPosFromCenter = topPos - topCenter;

        const leftPercent = (leftPosFromCenter / leftCenter) * 100;
        const topPercent = (topPosFromCenter / topCenter) * 100;

        // const fullTopPercent = (topPos / top) * 100;
        // const actualFullTopPercent = (fullTopPercent / 100) * maxB;

        const brightness = ((height - topPos) / height) * 2;
        const actualBrightness =
          brightness <= minB ? minB : brightness >= maxB ? maxB : brightness;

        const actualLeftPercent = (leftPercent / 100) * maxY;
        const actualTopPercent = (-topPercent / 100) * maxX;

        imageRef.current?.style.setProperty(
          "transform",
          `rotateY(${actualLeftPercent}deg) rotateX(${actualTopPercent}deg)`
        );
        // imageRef.current?.style.setProperty(
        //   "box-shadow",
        //   `${actualLeftPercent / 2}rem ${
        //     actualTopPercent / 2
        //   }rem 5rem -5rem rgba(0,0,0,0.75)`
        // );
        imageRef.current?.style.setProperty(
          "filter",
          `brightness(${actualBrightness})`
        );
      }}
      onMouseLeave={(e) => {
        allProps?.onMouseLeave ? allProps?.onMouseLeave(e) : null;
        imageRef.current?.style.setProperty(
          "transform",
          `rotateY(0deg) rotateX(0deg)`
        );
        imageRef.current?.style.setProperty("filter", `brightness(${1})`);
      }}
    >
      {React.Children.map(children, (child) =>
        child
          ? React.cloneElement(child, {
              ref: imageRef,
              className: `${shadow ? styles.object : ""} ${
                child?.props?.className ? child?.props?.className : ""
              }`,
              // style: `--zoomLevel:${zoomLevel}; --perspective:${perspective}`,
            })
          : null
      )}
      {/* <img ref={imageRef} src="/Fade.jpg" className={styles.image}></img> */}
    </div>
  );
};

export default Media;
