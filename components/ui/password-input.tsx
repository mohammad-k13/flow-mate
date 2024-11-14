"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"input">;

const PasswordInput = (props: Props) => {
  const { className, placeholder } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={cn(
          "flex h-9 p-3 w-full py-5 border-2 text-base font-700 border-foreground rounded-full text-foreground focus-visible:text-accent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-accent focus-visible:placeholder:text-accent placeholder:transition-colors focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-accent transition-colors"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
