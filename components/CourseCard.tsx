import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  platform: string;
}

export function CourseCard({ id, title, instructor, thumbnail, platform }: CourseCardProps) {
  return (
    <Link href={`/class/${id}`} className="block w-full">
      <div className="group h-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image src={thumbnail} alt={title} fill style={{ objectFit: "cover" }} className="transition-transform group-hover:scale-105" />
        </div>
        <div className="p-4">
          <h3 className="text-base font-medium leading-tight line-clamp-2">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{instructor}</p>
          <div className="mt-2">
            <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">{platform}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
