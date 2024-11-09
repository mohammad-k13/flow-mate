import clsx from "clsx";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  vertical?: boolean;
  align?: "center" | "end" | "start" | "baseline";
  justify?: "center" | "end" | "start" | "between" | "around" | "evenly";
  gap?: number;
  className?: string;
  wrap?:boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const Slack = (props: Props) => {
  const {
    align = "center",
    children,
    justify = "center",
    vertical = false,
    gap = 0,
    className,
    wrap = false,
    ...otherPorps
  } = props;
  return (
    <div
      className={clsx(
        `flex items-${align} justify-${justify} ${
          vertical ? "flex-col" : "flex-row"
        } ${wrap ? "flex-wrap" : "flex-nowrap"} ${className}`
      )}
      style={{
        gap,
      }}
      {...otherPorps}
    >
      {children}
    </div>
  );
};

export default Slack;
