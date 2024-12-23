"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const platforms = ["Youtube", "Class101", "Udemy", "Inflearn", "FastCampus", "NomadCoder", "기타"];

export const Navigation = () => {
  const pathname = usePathname();
  const currentPlatform = pathname.split("/")[2];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center h-auto sm:h-16 px-4 py-2 sm:py-0">
          <Link href="/" className="text-xl font-bold mb-2 sm:mb-0 sm:mr-8">
            JNJ-CLASS
          </Link>
          <div className="grid grid-cols-3 sm:flex sm:space-x-4 gap-2 w-full sm:w-auto">
            {platforms.map((platform) => (
              <Link
                key={platform}
                href={`/category/${platform.toLowerCase()}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                  currentPlatform === platform.toLowerCase() ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
