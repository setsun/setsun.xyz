// 1. View Transition API
import Image from "next/image";
import { useState } from "react";
import { flushSync } from "react-dom";

const VIEW_TRANSITION_CLASSNAME = "view-transition-component";

const UserInterface = () => {
  const [toggle, setToggle] = useState<boolean>();

  const handleViewTransition = () => {
    // @ts-ignore
    document.startViewTransition(() => {
      flushSync(() => {
        setToggle(!toggle);
      });
    });
  };

  return (
    <div className="font-antonio h-screen w-screen border">
      {toggle ? (
        <div
          className={`${VIEW_TRANSITION_CLASSNAME} relative left-1/2 top-1/2 h-1/2 w-1/2 border-2 border-white`}
          onClick={() => handleViewTransition()}
        >
          <h1>_01</h1>
        </div>
      ) : (
        <div
          className={`${VIEW_TRANSITION_CLASSNAME} relative h-1/4 w-1/4 rounded-full border-2 border-white`}
          onClick={() => handleViewTransition()}
        >
          <h1>_01</h1>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
