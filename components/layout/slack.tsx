import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

const slackVariants = cva(
  "flex",
  {
    variants: {
      justify: {
        center: "justify-center",
        end: "justify-end",
        start: "justify-start",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      align: {
        center: "items-center",
        end: "items-end",
        start: "items-start",
      },
      dir: {
        row: "flex-row",
        col: "flex-col",
        "row-reverse": "flex-row-reverse",
        "col-reverse": "flex-col-reverse",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
      },
    },
    defaultVariants: {
      justify: "center",
      align: "center",
      dir: "row",
    },
  }
);

type Props = {
  dir?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "center" | "end" | "start";
  justify?: "center" | "end" | "start" | "between" | "around" | "evenly";
  gap?: number;
  wrap?: "nowrap" | "wrap";
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const Slack = (props: Props) => {
  const { dir, justify, align, gap, wrap, children, className, ...otherProps } =
    props;
  return (
    <div
      className={cn(slackVariants({ align, justify, wrap, dir, className}))}
      style={{
        gap,
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Slack;
