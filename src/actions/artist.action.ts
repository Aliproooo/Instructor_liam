"use server";

import * as z from "zod";
import FormSchema from "@/util/form_schemas/landing_page.schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import FaQFormSchema from "@/util/form_schemas/faq.schema";
import { SessionSchema } from "@/util/form_schemas/session.schema";
import Stripe from "stripe";

type CreateLandingPageInput = z.infer<typeof FormSchema>;

export async function create_landing_page(
  input: CreateLandingPageInput
): Promise<{ success: boolean; error?: string } | any> {
  try {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }

    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const body = FormSchema.safeParse(input);
    if (!body.success) {
      return { success: false, error: body.error.format() };
    }

    const { data } = body;

    const landingPage = await prisma.landingPage.create({
      data: {
        externalId: user.id,
        description: data.description,
        name: data.artist_name,
        tagline: data.tagline,
        tagline_description: data.tagline_description,
      },
    });

    console.log(landingPage);

    const facebook = await prisma.social.create({
      data: {
        name: "Facebook",
        url: data.facebook,
        landingPageId: landingPage.id,
      },
    });

    const youtube = await prisma.social.create({
      data: {
        name: "Youtube",
        url: data.youtube,
        landingPageId: landingPage.id,
      },
    });

    const instagram = await prisma.social.create({
      data: {
        name: "Instagram",
        url: data.instagram,
        landingPageId: landingPage.id,
      },
    });

    return {
      success: true,
      data: { landingPage, facebook, youtube, instagram },
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: "something went wrong" };
  }
}

export async function create_key_point(input: string) {
  try {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }

    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId: user.id,
      },
    });

    if (!landing_page) {
      return {
        success: false,
        error: "landing page not found. First Create a landing page.",
      };
    }

    const body = input;
    if (!body) {
      return { success: false, error: "key point is required" };
    }

    const keypoint = input;

    const keypoint_obj = await prisma.keyPoints.create({
      data: {
        title: keypoint,
        landingPageId: landing_page.id,
      },
    });

    return { success: true, data: keypoint_obj };
  } catch (err) {
    console.log(err);
    return { success: false, error: "something went wrong" };
  }
}

type FaqInput = z.infer<typeof FaQFormSchema>;

export async function create_faq(input: FaqInput) {
  try {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }

    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId: user.id,
      },
    });

    if (!landing_page) {
      return {
        success: false,
        error: "landing page not found. First Create a landing page.",
      };
    }

    const body = FaQFormSchema.safeParse(input);
    if (!body.success) {
      return { success: false, error: body.error.format() };
    }

    const { data } = body;

    const faq = prisma.faq.create({
      data: {
        question: data.question,
        answer: data.ans,
        landingPageId: landing_page.id,
      },
    });

    return {
      success: true,
      data: faq,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: "something went wrong" };
  }
}

type SessionInput = z.infer<typeof SessionSchema>;

function calculateNumberOfSlots(data: SessionInput) {
  let totalSlots = 0;
  for (let i = 0; i < data.length; i++) {
    totalSlots += data[i].slots.length;
  }
  console.log(totalSlots);
  return totalSlots;
}

export async function create_session(input: SessionInput) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }

    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId: user.id,
      },
    });

    if (!landing_page) {
      return {
        success: false,
        error: "landing page not found. First Create a landing page.",
      };
    }

    const body = SessionSchema.safeParse(input);
    if (!body.success) {
      return { success: false, error: body.error.format() };
    }

    const { data } = body;

    const session = await prisma.sessionDetails.upsert({
      where: { landingPageId: landing_page.id },
      create: {
        slots_details: data,
        landingPageId: landing_page.id,
        slot_available: calculateNumberOfSlots(data),
      },
      update: {
        slots_details: data,
        landingPageId: landing_page.id,
        slot_available: calculateNumberOfSlots(data),
      },
    });
    console.log(session);
    return {
      success: true,
      data: session,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: "something went wrong" };
  }
}

export async function uploadFile(data: { id: string; path: string }) {
  try {
    const updatedLandingPage = prisma.landingPage.update({
      where: { externalId: data.id },
      data: {
        cover_image_url: data.path,
      },
    });
    return { success: true, data: updatedLandingPage };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      err: "something went wrong",
    };
  }
}

export async function uploadProfile(data: { id: string; path: string }) {
  try {
    const updatedLandingPage = prisma.landingPage.update({
      where: { externalId: data.id },
      data: {
        profile_pic_url: data.path,
      },
    });
    return { success: true, data: updatedLandingPage };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      err: "something went wrong",
    };
  }
}

type CheckoutData = {
  user_id: string;
  session_details: any;
  landing_page_id: number;
  day: string;
  email: string | null;
};

export async function checkout(data: CheckoutData) {
  const key = process.env.STRIPE_SECRET_KEY;
  console.log("key = ", key);
  const stripe = new Stripe(key as string);
  try {
    const session_details = data.session_details;
    const user_id = data.user_id;
    console.log("stripe create customer", user_id);
    let customer;
    if (user_id) {
      customer = await stripe.customers.create({
        metadata: {
          userId: user_id,
          session_details: JSON.stringify(session_details),
          landing_page_id: data.landing_page_id,
          day: data.day,
          email: data.email,
        },
      });
    }
    console.log(session_details);
    const line_items = session_details.slotsBooked.map((slot: any) => {
      const startTime = slot.startTime;
      const endTime = slot.endTime;
      const name = `${session_details.artist_name} - ${startTime} to ${endTime}`;
      const unit_amount = session_details.price * 100; // Convert price to cents

      return {
        price_data: {
          currency: "usd",
          unit_amount,
          product_data: {
            name,
            images: [session_details.artistImage], // Add product image URL here
          },
        },
        quantity: 1,
      };
    });
    if (!customer) {
      return { error: "customer not created", success: false };
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    console.log("session = ", session);
    console.log("customer = ", customer);
    return { sessions: session.url, success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function rescheduleSession(data: any) {
  const {
    finalData,
    selectedDay,
    checkedStates,
    session,
    order,
    day,
    start,
    end,
    dayRaw,
  } = data;
  console.log(checkedStates);
  // const arr = day.split(" ");
  // console.log(dayRaw);
  // let temp = arr[1];
  // arr[1] = arr[2];
  // arr[2] = temp;
  // const newDay = arr.join(" ");
  // //@ts-ignore

  // const selectedDayIndex = finalData.slots_details.findIndex((d) => {
  //   console.log(d.day === newDay);
  //   return d.day === newDay;
  // });

  // console.log(selectedDayIndex);
  // if (selectedDayIndex !== -1) {
  //   finalData.slots_details[selectedDayIndex].slots.push(
  //     `${start} to ${end} --- ${dayRaw}`
  //   );
  // }

  // console.log(`${start} to ${end} --- ${dayRaw}`);
  // console.log(finalData.slots_details[selectedDayIndex]);
  // const order_detail = JSON.parse(order.session_detail);
  // console.log(order_detail);
  // //@ts-ignore
  // const newOrderDetail = order_detail.map((item) => {
  //   console.log(item);
  //   if (
  //     item.startTime === session.startTime &&
  //     item.endTime === session.endTime
  //   ) {
  //     console.log("true");
  //     return {
  //       ...item,
  //       startTime: checkedStates.startTime,
  //       endTime: checkedStates.endTime,
  //     };
  //   }
  //   return { ...item };
  // });
  // try {
  //   const SessionDetails = await prisma.sessionDetails.update({
  //     where: { landingPageId: parseInt(order.landingPageId) },
  //     data: {
  //       slots_details: finalData.slots_details,
  //     },
  //   });

  //   const newOrder = await prisma.orders.update({
  //     where: {
  //       id: parseInt(order.id),
  //     },
  //     data: {
  //       session_detail: JSON.stringify(newOrderDetail),
  //     },
  //   });
  //   console.log(newOrder);
  //   console.log(SessionDetails);
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
}
