import HeroPage from "@/components/HeroPage";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Roboto_Condensed } from "next/font/google";
import { HoverCard } from "@/components/HoverCard";
import { Writer } from "@/components/Writer";

const roboto = Roboto_Condensed({ subsets: ["latin"], weight: ["400", "700"] });
export default async function Home() {
  const data = await prisma.landingPage.findMany();
  console.log(data);
  return (
    <main className="flex flex-col items-center justify-between mt-10">
      <HeroPage />
      <Writer />
      <div className="w-[80%] mb-32 -mt-40">
        <Carousel
          opts={{
            align: "start",
          }}
          className="min-w-xl h-96"
        >
          <CarouselContent>
            {data &&
              data.map((landing) => (
                <CarouselItem
                  key={landing.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Link href={`/artist/landing-page/${landing.id}`}>
                    <Card className=" flex flex-col items-center max-w-md px-2 py-10 rounded-2xl">
                      <CardContent>
                        {landing.profile_pic_url && (
                          <HoverCard
                            title={landing.name}
                            subtitle={landing.description}
                            url={landing.profile_pic_url}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
