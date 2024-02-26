import React from "react";
import Image from "next/image";
import Artist1 from "../../../../../public/Artist1.jpg";
import Facebook from "../../../../../public/facebook.svg";
import Tiktok from "../../../../../public/tiktok.svg";
import Instagram from "../../../../../public/instagram.svg";
import { Inter } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ArtistLandingPageSessionForm from "@/components/ArtistLandingPageSessionForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { SparklesHeading } from "@/components/SparkleHeading";
type Props = {
  params: { id: string };
};
const inter = Inter({ subsets: ["latin"], weight: ["800", "400"] });

async function getSessionDetails(id: string) {
  const session_details = await prisma.sessionDetails.findMany({
    where: { landingPageId: parseInt(id) },
  });
  console.log(session_details);
  return session_details[0];
}

async function getLandingPageDetails(id: number) {
  const landingPage = await prisma.landingPage.findUnique({
    where: {
      id,
    },
    include: {
      socials: true,
      keyPoints: true,
      faq: true,
    },
  });

  console.log(landingPage);
  if (!landingPage) {
    return null;
  }
  return landingPage;
}

async function getLandingPageSocials(id: number) {
  const landingPageData = await getLandingPageDetails(id);
  const groupedSocial = landingPageData?.socials.reduce((grouped, item) => {
    const key = item.name;
    //@ts-ignore
    if (!grouped[key]) {
      //@ts-ignore
      grouped[key] = [];
    }
    //@ts-ignore
    grouped[key].push(item);
    return grouped;
  }, {});

  console.log(groupedSocial);
  return groupedSocial;
}

async function page({ params }: Props) {
  const session_details = await getSessionDetails(params.id);
  console.log(session_details);
  const landingPage = await getLandingPageDetails(parseInt(params.id));
  const socials = await getLandingPageSocials(parseInt(params.id));
  return (
    <div className="min-h-screen pb-10">
      <div
        className="flex flex-col items-center justify-center   bg-cover aspect-video"
        style={{ backgroundImage: `url('${landingPage?.cover_image_url}')` }}
      >
        <h1 className="text-4xl px-10 bg-white text-violet-700 py-3">
          {landingPage && landingPage.tagline}
        </h1>

        <div className="bg-violet-700 text-lime-300 text-3xl font-medium py-4 px-3 rounded-xl mt-20">
          {landingPage && landingPage.tagline_description}
        </div>
      </div>
      <div className="flex items-center justify-center -mt-20 ">
        {landingPage && landingPage.profile_pic_url && (
          <Image
            className="rounded-2xl overflow-hidden"
            src={landingPage.profile_pic_url}
            alt="Artist"
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="flex flex-col items-center  justify-center">
        <div className="flex space-x-5 mt-10">
          {socials && (
            //@ts-ignore
            <Link href={socials.Facebook[0].url}>
              <Image width={64} src={Facebook} alt="Facebook" />
            </Link>
          )}
          {socials && (
            //@ts-ignore
            <Link href={socials.Instagram[0].url}>
              <Image width={64} src={Instagram} alt="Instagram" />
            </Link>
          )}{" "}
          {socials && (
            //@ts-ignore
            <Link href={socials.Youtube[0].url}>
              <Image width={64} src={Tiktok} alt="Tiktok" />
            </Link>
          )}{" "}
        </div>
        <h1 className="text-4xl font-medium mt-20 text-center">
          &#39;Engage and Connect with Your Instructor Today!&#39;
        </h1>
        <h1 className={`${inter.className} text-violet-700 text-[12rem] `}>
          {landingPage && <SparklesHeading heading={landingPage.name} />}
        </h1>

        <div className="w-full flex-col flex items-center justify-center py-10 mb-10 bg-violet-700">
          <div className="text-center bg-lime-200 py-4 px-20 rounded-lg text-violet-700">
            {session_details && (
              <h1 className={`${inter.className} text-8xl`}>
                {session_details.slot_available} of{" "}
                {session_details.slot_available}
              </h1>
            )}
            <h1 className="text-2xl">Slots with Maroon up for grab </h1>
          </div>
          {session_details && landingPage && (
            <ArtistLandingPageSessionForm
              landing_page_id={landingPage.id}
              artistImage={landingPage.profile_pic_url!}
              data={session_details.slots_details}
              price={session_details.session_price}
              discount={session_details.discount}
              artist_name={landingPage.name}
            />
          )}
        </div>

        <div className="flex flex-col space-y-3 px-10">
          <h1 className="text-4xl text-lime-200 font-bold">
            Why Choose {landingPage && landingPage.name} Music Session?
          </h1>
          {landingPage &&
            landingPage.keyPoints.map((keypoint) => (
              <h1 key={keypoint.id} className="text-xl">
                ✅ {keypoint.title}
              </h1>
            ))}
        </div>
        <h1 className="text-4xl mt-10 selection:bg-red-500">
          HEAR FROM OTHERS:
        </h1>
        <div className="grid grid-cols-3 gap-10">
          <video className="w-[300px] h-[600px]">
            <source src="/review.mp4" type="video/mp4" />
          </video>
          <video className="w-[300px] h-[600px]">
            <source src="/review.mp4" type="video/mp4" />
          </video>
          <video className="w-[300px] h-[600px]">
            <source src="/review.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="w-full px-20 mt-10">
          <h1 className="text-4xl py-10 font-extrabold">FaQs</h1>
          <Accordion type="single" collapsible className="w-full text-xl">
            {landingPage &&
              landingPage.faq.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.createdAt.toISOString()}
                >
                  <AccordionTrigger>{item.question}</AccordionTrigger>

                  <AccordionContent className="text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default page;
