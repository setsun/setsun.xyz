"use client";

import { animated, useSpring, useTransition } from "@react-spring/web";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

import { NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/common/constants";

interface Props {
  className?: string;
}

const MIN_WIDTH = "48px";
const MAX_WIDTH = "160px";

const Navigation: React.FC<Props> = ({ className }) => {
  const [isOpen, setOpen] = useState(false);

  // todo: quick and easy, prolly a better way to refactor later
  const searchParams = useSearchParams();
  const isImmersive = searchParams.get("immersive") === "true";

  const springStyle = useSpring({
    from: { width: MIN_WIDTH },
    to: { width: isOpen ? MAX_WIDTH : MIN_WIDTH },
  });

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  if (isImmersive) return null;

  return (
    <animated.nav
      style={springStyle}
      className={classNames(
        "relative flex flex-col items-center border-r border-r-zinc-200",
        className,
      )}
    >
      <button onClick={() => setOpen(!isOpen)} className="my-4">
        {isOpen ? (
          <RxCross1 className="h-6 w-6" />
        ) : (
          <RxHamburgerMenu className="h-6 w-6" />
        )}
      </button>

      <div className="relative flex h-full w-full items-center justify-center">
        {transition((style, isOpen) => {
          return isOpen ? (
            <animated.div
              className="absolute top-0 flex w-full flex-col gap-2 whitespace-nowrap px-4"
              style={style}
            >
              {NAVIGATION_ITEMS.map(({ name, link }) => (
                <a href={link} key={link} className="border-b py-1">
                  {name}
                </a>
              ))}
            </animated.div>
          ) : (
            <animated.div
              className="font-antonio absolute top-0 flex h-full items-center justify-between text-xl uppercase"
              style={{
                textOrientation: "upright",
                writingMode: "vertical-lr",
                ...style,
              }}
            >
              <span>setsun.xyz</span>

              <div className="my-4 flex gap-4">
                {SOCIAL_LINKS.map(({ name, link, icon }) => (
                  <a
                    href={link}
                    key={name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </animated.div>
          );
        })}
      </div>
    </animated.nav>
  );
};

export default Navigation;
