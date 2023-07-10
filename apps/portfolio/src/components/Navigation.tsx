"use client";

import { animated, useTransition, useSpring } from "@react-spring/web";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import classNames from "classnames";
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/common/constants";

interface Props {
  className?: string;
}

const MIN_WIDTH = "64px";
const MAX_WIDTH = "128px";

const SideNavigation: React.FC<Props> = ({ className }) => {
  const [isOpen, setOpen] = useState(false);

  const springStyle = useSpring({
    from: { width: MIN_WIDTH },
    to: { width: isOpen ? MAX_WIDTH : MIN_WIDTH },
  });

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <animated.nav
      style={springStyle}
      className={classNames(
        "relative flex flex-col items-center border-r-2 border-r-zinc-200",
        className
      )}
    >
      <button onClick={() => setOpen(!isOpen)} className="my-4">
        {isOpen ? (
          <Cross1Icon className="h-8 w-8" />
        ) : (
          <HamburgerMenuIcon className="h-8 w-8" />
        )}
      </button>

      <div className="relative flex h-full w-full items-center justify-center">
        {transition((style, isOpen) => {
          return isOpen ? (
            <animated.div
              className="absolute top-0 flex flex-col gap-2"
              style={style}
            >
              {NAVIGATION_ITEMS.map(({ name, link }) => (
                <a href={link} key={link} className="border-b-[1px] py-1">
                  {name}
                </a>
              ))}
            </animated.div>
          ) : (
            <animated.div
              className="font-antonio absolute top-0 flex h-full items-center justify-between text-xl font-extrabold uppercase"
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

export default SideNavigation;
