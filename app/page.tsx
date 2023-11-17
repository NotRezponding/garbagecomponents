"use client";

import Image from "next/image";
import Anchor from "./{components}/Anchor";
import Link from "next/link";
import Media from "./{components}/Media";
import Button from "./{components}/Button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ChangeCursor, ResetCursor } from "./{functions}/MovingCursor";

export default function Home() {
  const imageRef = useRef<HTMLImageElement>(null);

  const allProducts = [
    {
      img: "/mw3.jpg",
      title: "Call of Duty: Modern Warfare III",
      price: "$70",
      links: [
        {
          label: "Steam",
          url: "steam.com",
        },
        {
          label: "Playstation",
          url: "ps.com",
        },
      ],
      hover: "IGN 4/10",
    },
    {
      img: "/ori.jpg",
      title: "Ori and the Will of the Wisps",
      price: "$9.99",
      links: [
        {
          label: "Steam",
          url: "steam.com",
        },
        {
          label: "Xbox",
          url: "xbox.com",
        },
      ],
      hover: "IGN 9/10",
    },
    {
      img: "/alanwake2.avif",
      title: "Alan Wake 2",
      price: "$59.99",
      links: [
        {
          label: "Playstation",
          url: "ps.com",
        },
      ],
      hover: "IGN 9/10",
    },
  ];

  // useEffect(() => {
  //   const getmain = document.getElementById("content_wrapper");
  //   document.body.scroll({ top: 1800 });
  //   const scrollingFunction = (e: WheelEvent) => {
  //     const currentScrollY = getmain?.scrollTop ? getmain?.scrollTop : 0;
  //     const currentScrollX = getmain?.scrollLeft ? getmain?.scrollLeft : 0;
  //     let scrollSize = {
  //       top: currentScrollY + e.deltaY,
  //     };
  //     getmain?.scrollTo(scrollSize);
  //   };

  //   window.addEventListener("wheel", scrollingFunction);

  //   return () => {
  //     window.removeEventListener("wheel", scrollingFunction);
  //   };
  // }, []);

  useEffect(() => {
    const movingCursor = document.getElementById("moving_cursor");

    let animationFrame: number;

    let mouseY = 0;
    let mouseX = 0;

    const moving = (e: MouseEvent) => {
      // movingCursor?.style.setProperty("transform", `scaleX(0.5)`);
      // gsap.to(movingCursor, {
      //   scaleX: 1,
      //   duration: 1,
      // });
      mouseY = e.y;
      mouseX = e.x;
      movingCursor?.animate(
        {
          top: `${e.y}px`,
          left: `${e.x}px`,
        },
        {
          duration: 350,
          fill: "forwards",
          direction: "normal",
        }
      );
    };

    const checkingPosition = () => {
      // gsap.to(movingCursor, {
      //   scaleX: 1,
      //   duration: 1,
      // });
      // movingCursor?.animate(
      //   {
      //     transform: "scaleX(1)",
      //   },
      //   {
      //     duration: 500,
      //     fill: "forwards",
      //     direction: "normal",
      //     iterations: Infinity,
      //   }
      // );
      // const topPos = movingCursor?.getBoundingClientRect().top;
      // const leftPos = movingCursor?.getBoundingClientRect().left;
      // const maxScale = 0.8;
      // if (topPos !== undefined && leftPos !== undefined) {
      //   const topScale = (topPos - mouseY) / 100;
      //   const leftScale = (leftPos - mouseX) / 100;
      //   const squareRoot = Math.sqrt(
      //     Math.pow(topScale, 2) + Math.pow(topScale, 2)
      //   );
      //   movingCursor?.style.setProperty(
      //     "--scaleX",
      //     `${squareRoot >= maxScale ? maxScale : 1 - Math.abs(squareRoot)}`
      //   );
      // }
      // animationFrame = requestAnimationFrame(checkingPosition);
    };
    // animationFrame = requestAnimationFrame(checkingPosition);

    window.addEventListener("mousemove", moving);

    return () => {
      window.removeEventListener("mousemove", moving);
      // cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="flex flex-col items-center gap-12 px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full">
        <div className="flex flex-col gap-6 items-start">
          <span className="inline-flex gap-4 font-medium">
            <span>/</span>
            <span>About Me</span>
          </span>
          <p className="text-2xl font-medium leading-9">
            I'm a human. Love creating something new. Up to a challenge. 50%
            Indonesian, 49% Water, and 1% good guy {":)"}
          </p>
          <Button>Learn More</Button>
        </div>
        {/* <Media /> */}
      </div>
      <div className="grid md:grid-cols-3 max-w-5xl gap-4">
        {allProducts?.map((prod) => (
          <div className="flex flex-col gap-4">
            <Media
              onMouseEnter={() => {
                ChangeCursor(`${prod?.hover}`, "255,255,255", "10rem");
              }}
              onMouseLeave={() => {
                ResetCursor();
              }}
              className="w-full h-72"
              shadow
            >
              <img
                src={`${prod?.img}`}
                alt={`${prod?.title}`}
                className="w-full h-full object-cover"
              />
            </Media>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-medium">{prod?.title}</span>
              <span>{prod?.price}</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-4 flex-wrap">
              {prod?.links?.map((link) => (
                <Anchor
                  onMouseEnter={() => {
                    ChangeCursor(
                      `Buy this via ${link?.label}`,
                      "50,50,50",
                      "8rem",
                      "255,255,255"
                    );
                  }}
                  onMouseLeave={() => {
                    ResetCursor();
                  }}
                >
                  {link?.label}
                </Anchor>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
