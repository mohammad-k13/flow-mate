import React, { ReactNode } from "react";

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  weigth?:
    | "900"
    | "800"
    | "700"
    | "600"
    | "500"
    | "400"
    | "300"
    | "200"
    | "100";

  children: ReactNode;
};

const Title = ({ level, className, children }: Props) => {
  switch (level) {
    case 1:
      return <h1 className={`font-900 text-5xl ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`font-800 text-5xl ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`font-700 text-4xl ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`font-700 text-3xl ${className}`}>{children}</h4>;
    case 5:
      return <h5 className={`font-700 text-2xl ${className}`}>{children}</h5>;
  }
};

export default Title;
