import * as React from "react";

import { cn } from "@/lib/utils";
import PasswordInput from "./password-input";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            "flex h-9 p-3 w-full py-5 border-2 text-base font-700 border-foreground rounded-full text-foreground focus-visible:text-accent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-accent focus-visible:placeholder:text-accent placeholder:transition-colors focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
);
Input.displayName = "Input";

export { Input };
