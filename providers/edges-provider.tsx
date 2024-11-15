import { type ReactNode } from "react";
import { InputTextProvider } from "./input-text-provider";
import { CanvasProvider } from "./canvas-provider";

type Props = {
  children: ReactNode;
};

const EdgesProvider = ({ children }: Props) => {
  return <CanvasProvider>{children}</CanvasProvider>
};

export default EdgesProvider;
