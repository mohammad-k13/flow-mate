import type { Metadata } from "next";
import "./globals.css";
import { ReactFlowProvider } from "@xyflow/react";
import EdgesProvider from "@/providers/edges-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "FlowMate – Empower Your Workflows with Flow-Mate.",
  description:
    "Automate, Integrate, Elevate – Empower Your Workflows with Flow-Mate.",
    icons: [
      {
        url: "/Logo.svg"
      }
    ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-screen max-w-[1920px] min-h-screen overflow-hidden mx-auto dark:bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactFlowProvider>
            <EdgesProvider>{children}</EdgesProvider>
          </ReactFlowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
