import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Clock } from "lucide-react";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default function ClassPage({ params }: Props) {
  const { id } = params;

  // Temporary mock data
  const mockClass = {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "John Doe",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80",
    platform: "Youtube",
    description:
      "Learn web development from scratch with this comprehensive course. Master HTML, CSS, JavaScript, React, and more with hands-on projects and real-world examples.",
    level: "초급자",
    totalDuration: "32시간",
    totalLectures: "280개의 강의",
    curriculum: [
      {
        title: "섹션 1: 웹 개발 소개",
        lectures: [
          { title: "웹 개발이란 무엇인가?", duration: "15:00" },
          { title: "개발 환경 설정하기", duration: "25:00" },
          { title: "VS Code 설치 및 설정", duration: "20:00" },
        ],
      },
      {
        title: "섹션 2: HTML 기초",
        lectures: [
          { title: "HTML 구조 이해하기", duration: "30:00" },
          { title: "태그와 속성 다루기", duration: "45:00" },
          { title: "시맨틱 마크업 작성하기", duration: "35:00" },
        ],
      },
      {
        title: "섹션 3: CSS 스타일링",
        lectures: [
          { title: "CSS 선택자 마스터하기", duration: "40:00" },
          { title: "Flexbox 레이아웃", duration: "50:00" },
          { title: "반응형 디자인 구현", duration: "45:00" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden relative">
              <Image src={mockClass.thumbnail} alt={mockClass.title} fill className="object-cover" />
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{mockClass.level}</span>
                <span>•</span>
                <span>{mockClass.totalDuration}</span>
                <span>•</span>
                <span>{mockClass.totalLectures}</span>
              </div>
              <h1 className="text-3xl font-bold">{mockClass.title}</h1>
              <p className="text-muted-foreground mt-2">{mockClass.instructor}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">강의 소개</h2>
              <p className="text-muted-foreground whitespace-pre-line">{mockClass.description}</p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">커리큘럼</h2>
                <div className="text-sm text-muted-foreground mb-6">
                  총 {mockClass.totalLectures} · {mockClass.totalDuration}
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {mockClass.curriculum.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{section.lectures.length}개 강의</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                              <PlayCircle className="w-4 h-4 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="text-sm">{lecture.title}</div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {lecture.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button className="w-full mt-6">수강 시작하기</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
