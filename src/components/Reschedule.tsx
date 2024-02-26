"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { rescheduleSession } from "@/actions/artist.action";
type Props = {
  data: any;
  id: number;
  order: any;
  day: any;
  start: any;
  end: any;
  dayRaw: any;
  session: any;
};

function Reschedule({
  data,
  id,
  order,
  day,
  start,
  end,
  dayRaw,
  session,
}: Props) {
  console.log(dayRaw);
  const filteredData = data.filter((item: any) => item.landingPageId === id);
  console.log(day);
  const finalData = filteredData[0];
  const [selectedDay, setSelectedDay] = useState("");
  const [checkedStates, setCheckedStates] = useState({});
  const handleDayClick = (day: any) => {
    setCheckedStates({});
    setSelectedDay(day);
  };
  console.log(finalData);

  async function reschedule() {
    const res = await rescheduleSession({
      selectedDay,
      checkedStates,
      order,
      finalData,
      day,
      start,
      end,
      dayRaw,
      session,
    });
  }
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Calendar />
            </TooltipTrigger>
            <TooltipContent>
              <p>reschedule</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule</DialogTitle>
          <DialogDescription>
            Reschedule the session
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 mt-10 ">
                {finalData &&
                  finalData.slots_details
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
                    {finalData.slots_details.map((data: any) => {
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
                                  //@ts-ignore

                                  [slot]: !checkedStates[slot],
                                })
                              }
                            />
                            <label
                              onClick={() =>
                                setCheckedStates({
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

              <Button onClick={() => reschedule()} className="w-full">
                Reschedule
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Reschedule;
