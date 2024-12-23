import { Navigation } from "@/components/Navigation";
import { PlatformSection } from "@/components/PlatformSection";
import { CourseCard } from "@/components/CourseCard";

// Temporary mock data
const mockCourses = {
  youtube: [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "John Doe",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      platform: "Youtube",
    },
    {
      id: "2",
      title: "Advanced JavaScript Course",
      instructor: "Jane Smith",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      platform: "Youtube",
    },
    {
      id: "3",
      title: "React Native Mobile Development",
      instructor: "Mike Johnson",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      platform: "Youtube",
    },
    {
      id: "4",
      title: "Digital Art Masterclass",
      instructor: "Sarah Wilson",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      platform: "Youtube",
    },
    {
      id: "5",
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Brown",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      platform: "Youtube",
    },
  ],
  class101: [
    {
      id: "6",
      title: "Product Photography Basics",
      instructor: "Chris Lee",
      thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      platform: "Class101",
    },
    // ... 더 많은 강의 데이터
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-screen-xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(mockCourses).map(([platform, courses]) =>
            courses.slice(0, 5).map((course) => (
              <div key={course.id} className="w-full">
                <CourseCard {...course} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
