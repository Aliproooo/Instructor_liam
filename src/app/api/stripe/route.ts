import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Cors from "micro-cors";
import Stripe from "stripe";
import axios from "axios";
import prisma from "@/lib/prisma";
import { json } from "stream/consumers";
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

async function updateTheSessionDetails(
  slotsBooked: {
    startTime: string;
    endTime: string;
    available: boolean;
  }[],
  dayToBeDeleted: string,
  id: string
) {
  console.log(slotsBooked);
  console.log(dayToBeDeleted);
  console.log(id);
  const data = await prisma.sessionDetails.findMany({
    where: {
      landingPageId: parseInt(id),
    },
  });

  const filteredData = data.map((item) => {
    if (Array.isArray(item.slots_details)) {
      const filteredSlots = item.slots_details.map((slot) => {
        //@ts-ignore
        if (slot.day === dayToBeDeleted) {
          //@ts-ignore

          const filteredSlotTimes = slot.slots.filter((slotTime) => {
            const startTime = slotTime.split("---")[0].split("to")[0].trim();
            return !slotsBooked.some(
              (slotBooked) => slotBooked.startTime.trim() === startTime
            );
          });
          //@ts-ignore

          return { ...slot, slots: filteredSlotTimes };
        }
        return slot;
      });
      return { ...item, slots_details: filteredSlots };
    }
    return item;
  });

  console.log(filteredData);

  const updatedSessionDetails = await prisma.sessionDetails.update({
    where: {
      id: data[0].id,
    },
    data: {
      //@ts-ignore

      slots_details: filteredData[0].slots_details,
    },
  });

  console.log(updatedSessionDetails);
  console.log(updatedSessionDetails);
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const key = process.env.STRIPE_SECRET_KEY;
    const stripe = new Stripe(key as string);
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        {
          message: "something went wrong",
          ok: false,
        },
        { status: 500 }
      );
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    const data = event.data.object;
    if (event.type === "checkout.session.completed") {
      //@ts-ignore

      const customerData = await stripe.customers.retrieve(data.customer);

      const zoom_res = await axios.post("http://localhost:3000/api/zoom");
      console.log(zoom_res.data);
      const zoom_token = zoom_res.data.access_token;
      const zoomMeetingUrl = "https://api.zoom.us/v2/users/me/meetings";
      //@ts-ignore

      const session_details = JSON.parse(customerData.metadata.session_details);

      console.log(session_details);
      //@ts-ignore

      console.log(customerData.metadata.day.trim());
      //@ts-ignore

      const date = new Date(customerData.metadata.day.trim());
      console.log(date);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      //@ts-ignore

      const requestBodyArray = session_details.slotsBooked.map((slot) => {
        console.log(slot);
        const formattedDate = `${year}-${month}-${day}T${slot.startTime}:00`;
        console.log(formattedDate);
        return {
          topic: "Music Session",
          type: "2",
          start_time: formattedDate,
          duration: "40",
          password: "123",
          agenda: "Music Session",
          settings: {
            host_video: "true",
            participant_video: "true",
            join_before_host: "true",
            mute_upon_entry: "true",
          },
        };
      });
      const result: any = [];
      for (let requestBody of requestBodyArray) {
        console.log(requestBody);
        const zoomRes = await axios.post(zoomMeetingUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${zoom_token}`,
          },
        });
        console.log(zoomRes.data);
        result.push(zoomRes.data.join_url);
        console.log(zoomRes.data.join_url);
      }
      //@ts-ignore

      console.log(data.amount_total);
      console.log(session_details.slotsBooked);
      console.log(JSON.stringify(session_details));
      console.log(JSON.stringify(session_details.slotsBooked));
      const order = await prisma.orders.create({
        data: {
          //@ts-ignore

          bill_amount: data.amount_total,

          artist_name: session_details!.artist_name,
          //@ts-ignore

          customer_email: customerData.metadata.email,
          zoom_link: result.join("---"),
          //@ts-ignore

          landingPageId: parseInt(customerData.metadata.landing_page_id),
          session_detail: JSON.stringify(session_details.slotsBooked),
        },
      });

      console.log(order);
      updateTheSessionDetails(
        session_details.slotsBooked,
        //@ts-ignore

        customerData.metadata.day,
        //@ts-ignore

        customerData.metadata.landing_page_id
      );
      return NextResponse.json({ result: order, ok: true });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
