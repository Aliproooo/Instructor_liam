"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { checkout } from "@/actions/artist.action";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
type Props = {
  data: any;
  price: number;
  discount: number;
  artist_name: string;
  artistImage: string;
  landing_page_id: number;
};

function ArtistLandingPageSessionForm({
  data: calendarData,
  artist_name,
  price,
  discount,
  artistImage,
  landing_page_id,
}: Props) {
  console.log(calendarData);
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");
  const [checkedStates, setCheckedStates] = useState({});
  const { isAuthenticated, user } = useKindeBrowserClient();
  // const user = getUser();
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };
  console.log(checkedStates);
  const handleDayClick = (day: any) => {
    setCheckedStates({});
    setSelectedDay(day);
  };
  const handleNextClick = () => {
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }

    if (!user) {
      redirect("/api/auth/login");
    }

    setStep(step + 1);
  };
  async function handleCheckout() {
    const dataArray = Object.entries(checkedStates).map(([time, status]) => {
      const [start, end] = time.split("---")[0].trim().split(" to ");
      const startTime = start.trim();
      const endTime = end.trim();
      const day = time.split("---")[1].trim();
      console.log(day);

      return {
        startTime,
        endTime,
        day,
        available: status,
      };
    });

    const filteredData = dataArray.filter((item) => item.available === true);
    const dataForCheckout = {
      slotsBooked: filteredData,
      artist_name,
      price,
      discount,
      artistImage,
    };
    if (user) {
      const result = await checkout({
        user_id: user.id,
        session_details: dataForCheckout,
        landing_page_id,
        day: selectedDay,
        email: user.email,
      });
      console.log(result);
      if (result.success) {
        window.location.href = result.sessions!;
      }
    }
  }
  console.log(calendarData);
  return (
    <AnimatePresence>
      <div className="flex flex-row">
        {step === 1 && isAuthenticated ? (
          <motion.div
            key={step}
            id="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="grid grid-cols-2 gap-5 mt-10"
          >
            <input
              className="px-4 border-lime-200 border-4 w-[400px] py-4 text-violet-700 placeholder:text-violet-700 placeholder:text-2xl text-2xl"
              placeholder="Name"
              type="text"
            />
            <input
              className="px-4 border-lime-200 border-4 w-[400px] py-4 text-violet-700 placeholder:text-violet-700 placeholder:text-2xl text-2xl"
              placeholder="Email"
              type="email"
            />
            <input
              className="col-span-2  border-lime-200 border-4 px-4 w-full py-4 text-violet-700 placeholder:text-violet-700 placeholder:text-2xl text-2xl"
              placeholder="Phone"
              type="number"
            />
            <Button
              className="col-start-2 py-6 bg-lime-200"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </motion.div>
        ) : (
          step === 1 && (
            <h1 className="text-2xl mt-3">Login to book the session</h1>
          )
        )}
        {step === 2 && (
          <motion.div
            id="step2"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-5 mt-10"
          >
            <div className="grid grid-cols-3 gap-2 ">
              {calendarData &&
                calendarData
                  .filter(
                    (item: any) =>
                      new Date(item.day).getDate() >= new Date().getDate()
                  )
                  .map((item: any) => (
                    <div key={item.day} className="mx-2">
                      <Button
                        variant={
                          selectedDay === item.day ? "default" : "secondary"
                        }
                        onClick={() => handleDayClick(item.day)}
                      >
                        {item.day}
                      </Button>
                    </div>
                  ))}
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              {selectedDay && (
                <>
                  {calendarData.map((data: any) => {
                    if (data.day === selectedDay) {
                      return data.slots.map((slot: string) => (
                        <div
                          className={`flex items-center justify-center border-lime-200 ${
                            //@ts-ignore
                            checkedStates[slot] ? "bg-green-200" : "bg-white"
                          } text-violet-700 space-x-4 border-2 py-4`}
                          key={slot}
                          onClick={() =>
                            setCheckedStates({
                              ...checkedStates,
                              //@ts-ignore

                              [slot]: !checkedStates[slot],
                            })
                          }
                        >
                          <input
                            type="checkbox"
                            id={slot}
                            name={slot}
                            value={slot}
                            className="hidden"
                            //@ts-ignore

                            checked={checkedStates[slot] || false}
                            onChange={() =>
                              setCheckedStates({
                                ...checkedStates,
                                //@ts-ignore

                                [slot]: !checkedStates[slot],
                              })
                            }
                          />
                          <label
                            onClick={() =>
                              setCheckedStates({
                                ...checkedStates,
                                //@ts-ignore

                                [slot]: !checkedStates[slot],
                              })
                            }
                            htmlFor={slot}
                          >{`${slot.split("---")[0].split("to")[0]} ---- ${
                            slot.split("---")[0].split("to")[1]
                          }`}</label>
                        </div>
                      ));
                    }
                    console.log(checkedStates);
                    return null;
                  })}
                </>
              )}
            </div>
            <div
              // href="https://buy.stripe.com/test_28oeVTcYX5qd6JO5kk"
              onClick={handleCheckout}
              className="col-start-2 py-6 bg-lime-200 hover:bg-lime-300 duration-300 transition-colors cursor-pointer"
            >
              <h1 className="text-violet-700 text-center text-xl font-medium">
                Buy Session
              </h1>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default ArtistLandingPageSessionForm;
