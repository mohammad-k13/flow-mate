import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "p-2 shadow-border-1 dark:text-foreground/90 hover:bg-secondary transition-all",
        "shadow-2":
        "p-2 shadow-border-2 dark:text-foreground/90 hover:bg-secondary transition-all",
        "shadow-3":
        "p-2 shadow-border-3 dark:text-foreground/90 hover:bg-secondary transition-all",
        "shadow-4":
        "p-2 shadow-border-4 dark:text-foreground/90 hover:bg-secondary transition-all",
      },
      size: {
        default: "px-4 py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// import { type ComponentPropsWithoutRef, type ReactNode } from "react";

// type Props = {
//   children: ReactNode | string | number;
//   variant?: string;
//   size?: any;
// } & ComponentPropsWithoutRef<"button">;

// const Button = (props: Props) => {
//   const { children, className, ...otherProps } = props;

//   return (
//     <button
//       className={` ${className}`}
//       {...otherProps}
//     >
//       {children}
//     </button>
//   );
// };

// export { Button };
