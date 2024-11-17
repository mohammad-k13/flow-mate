"use client";

import { ChevronRight, Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Text from "@/components/typeography/text";

const DashboardBreadcrumb = () => {
  const pathname = usePathname();

  // Split pathname into segments and remove empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {/* Home link */}
      <Link href="/" className="">
        <Text>Home</Text>
      </Link>

      {pathSegments.map((segment, index) => {
        // Generate the path up to the current segment
        const isLastSegment = index === pathSegments.length - 1;
        const segmentPath = "/" + pathSegments.slice(0, index + 1).join("/");

        // Capitalize the first letter of each segment
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={index} className="flex items-center space-x-2">
            {/* Chevron icon */}
            <ChevronRight size={15} />

            {/* Breadcrumb link */}
            {isLastSegment ? (
              <Text className="">{label}</Text>
            ) : (
              <Link
                href={segmentPath}
                className="text-muted-foreground hover:text-primary"
              >
                <Text>{label}</Text>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DashboardBreadcrumb;
