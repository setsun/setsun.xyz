"use client";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import classNames from "classnames";
import { NAVIGATION_ITEMS } from "../common/constants";

interface Props {
  className?: string;
}

const SideNavigation: React.FC<Props> = ({ className }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav
      className={classNames(
        "flex min-w-max flex-col items-center border-r-2 border-r-zinc-200 p-6",
        className
      )}
    >
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
          <Cross1Icon className="h-8 w-8" />
        ) : (
          <HamburgerMenuIcon className="h-8 w-8" />
        )}
      </button>

      <div className="mt-4 flex flex-col gap-1">
        {isOpen ? (
          NAVIGATION_ITEMS.map(({ name, link }) => (
            <a href={link} key={link}>
              {name}
            </a>
          ))
        ) : (
          <div
            className="font-antonio text-xl font-light uppercase"
            style={{
              textOrientation: "upright",
              writingMode: "vertical-lr",
            }}
          >
            setsun.xyz
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideNavigation;
