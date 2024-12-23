"use client";

import { CourseCard } from "./CourseCard";
import { Button } from "./ui/button";

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  platform: string;
}

interface PlatformSectionProps {
  platform: string;
  courses: Course[];
}

export const PlatformSection = ({ platform, courses }: PlatformSectionProps) => {
  return (
    <div className="platform-section w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{platform}</h2>
        <Button variant="outline" size="sm">
          더보기
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {courses.slice(0, 5).map((course) => (
          <div key={course.id} className="w-full">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};
