"use client";

import React, { DetailedHTMLProps, FC, HTMLAttributes, useRef } from "react";

import styles from "./styles.module.css";

const Button: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...allProps }) => {
  const circleRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      //   className="py-5 px-5 -my-5 -mx-5"
      onMouseMove={(e) => {
        const height = e.currentTarget.getBoundingClientRect().height;
        const width = e.currentTarget.getBoundingClientRect().width;
        const top = e.currentTarget.getBoundingClientRect().top;
        const left = e.currentTarget.getBoundingClientRect().left;

        const topCenter = height / 2;
        const leftCenter = width / 2;

        const currentX = e.clientX - left - leftCenter;
        const currentY = e.clientY - top - topCenter;

        // console.log(topCenter);
        // console.log(leftCenter);

        buttonRef.current?.style.setProperty(
          "transform",
          `translate(${currentX / 4}px, ${currentY / 4}px)`
        );
      }}
      onMouseLeave={(e) => {
        buttonRef.current?.style.setProperty(
          "transform",
          `translate(${0}px, ${0}px)`
        );
      }}
    >
      <button
        ref={buttonRef}
        className={styles.button}
        {...allProps}
        onMouseMove={(e) => {
          const height = e.currentTarget.getBoundingClientRect().height;
          const width = e.currentTarget.getBoundingClientRect().width;
          const top = e.currentTarget.getBoundingClientRect().top;
          const left = e.currentTarget.getBoundingClientRect().left;
          circleRef.current?.style.setProperty("top", `${e.clientY - top}px`);
          circleRef.current?.style.setProperty("left", `${e.clientX - left}px`);
          circleRef.current?.style.setProperty("opacity", "1");
          circleRef.current?.style.setProperty("--scale", "1");
          circleRef.current?.style.setProperty(
            "--size",
            `${height > width ? height : width}px`
          );
          circleRef.current?.style.setProperty("--blur", "0rem");
        }}
        onMouseLeave={(e) => {
          circleRef.current?.style.setProperty("opacity", "0");
          circleRef.current?.style.setProperty("--scale", "0");
          circleRef.current?.style.setProperty("--blur", "1rem");
        }}
      >
        <span className={styles.child}>{children}</span>
        <span ref={circleRef} className={styles.circle}></span>
      </button>
    </div>
  );
};

export default Button;
