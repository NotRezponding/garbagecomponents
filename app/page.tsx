"use client";

import Image from "next/image";
import Anchor from "./{components}/Anchor";
import Link from "next/link";
import Media from "./{components}/Media";
import Button from "./{components}/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full">
        <div className="flex flex-col gap-6 items-start">
          <span className="inline-flex gap-4 font-medium">
            <span>/</span>
            <span>About Us</span>
          </span>
          <p className="text-2xl font-medium leading-9">
            We are a software development teams that created an amazing
            projects. We valued the usefulness and compatibility of every
            projects that we created, and making sure that all creation will not
            be abandoned and throwed away
          </p>
          <Button>Learn More</Button>
        </div>
        <div className="perspective">
          <img
            onMouseMove={(e) => {
              const maxY = 15;
              const maxX = 15;

              const maxB = 1.2;
              const minB = 0.75;

              const width = e.currentTarget.getBoundingClientRect().width;
              const height = e.currentTarget.getBoundingClientRect().height;
              const top = e.currentTarget.getBoundingClientRect().top;
              const left = e.currentTarget.getBoundingClientRect().left;
              const topPos = e.pageY - top;
              const leftPos = e.pageX - left;

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
                brightness <= minB
                  ? minB
                  : brightness >= maxB
                  ? maxB
                  : brightness;

              const actualLeftPercent = (leftPercent / 100) * maxY;
              const actualTopPercent = (-topPercent / 100) * maxX;

              e.currentTarget.style.setProperty(
                "transform",
                `rotateY(${actualLeftPercent}deg) rotateX(${actualTopPercent}deg)`
              );
              e.currentTarget.style.setProperty(
                "filter",
                `brightness(${actualBrightness})`
              );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty(
                "transform",
                `rotateY(0deg) rotateX(0deg)`
              );
              e.currentTarget.style.setProperty("filter", `brightness(${1})`);
            }}
            src="/Fade.jpg"
            className="test"
          ></img>
        </div>
      </div>
    </main>
  );
}
