import React from "react";

const Triangle = () => {
  return (
    <div className="absolute left-2 top-2 w-[12px] h-[12px] bg-foreground before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bottom-[-11px] before:right-[-11px] before:rotate-45 before:bg-accent before: overflow-hidden"></div>
  );
};

export default Triangle;
