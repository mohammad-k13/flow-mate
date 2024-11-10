import { type ReactNode } from "react";
import { InputTextProvider } from "./input-text-provider";

type Props = {
  children: ReactNode;
};

const EdgesProvider = ({ children }: Props) => {
  return <InputTextProvider>{children}</InputTextProvider>;
};

export default EdgesProvider;
