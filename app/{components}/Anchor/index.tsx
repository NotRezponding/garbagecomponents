"use client";

import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useLayoutEffect,
  useRef,
} from "react";

import styles from "./styles.module.css";

const Anchor: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    children?: string;
    style?: CSSProperties & {
      [key: string]: string;
    };
  }
> = ({ children, ...allProps }) => {
  const AnchorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const counts = children?.split("").length
      ? children?.split("").length + 1
      : 0;
    AnchorRef.current?.style.setProperty(
      "--delayedDuration",
      `${counts * 25}ms`
    );
  }, []);

  return (
    <span
      onMouseEnter={(e) => {
        e.currentTarget.classList.add(styles.playAnimate);
        allProps?.onMouseEnter ? allProps?.onMouseEnter(e) : null;
      }}
      ref={AnchorRef}
      {...allProps}
      className={`${styles.anchor} font-bold relative overflow-hidden transition-colors cursor-pointer`}
    >
      <span className={styles.firstText}>
        {children?.split("").map((text, index) => (
          <span
            className={styles.firstTextLetter}
            style={{ animationDelay: `${index * 25}ms` }}
          >
            {text == " " ? <>&nbsp;</> : text}
          </span>
        ))}
      </span>
      <span className={styles.secondText}>
        {children?.split("").map((text, index) => (
          <span
            onAnimationEnd={(e) => {
              if (children.split("").length == index + 1) {
                AnchorRef.current?.classList.remove(styles.playAnimate);
              }
            }}
            className={styles.secondTextLetter}
            style={{ animationDelay: `${index * 25}ms` }}
          >
            {text == " " ? <>&nbsp;</> : text}
          </span>
        ))}
      </span>
    </span>
  );
};

export default Anchor;
