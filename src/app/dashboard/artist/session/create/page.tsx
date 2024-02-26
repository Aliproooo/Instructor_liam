"use client";
import { create_session } from "@/actions/artist.action";
import { Button } from "@/components/ui/button";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

function Page() {
  const today: Date = new Date();

  const days: Date[] = Array.from({ length: 7 }, (_, i) => {
    const nextDay: Date = new Date(today);
    nextDay.setDate(today.getDate() + i);
    return nextDay;
  });

  const initialSchedule: { [key: string]: string[] } = days.reduce(
    (acc, day) => {
      //@ts-ignore
      acc[day.toISOString()] = [];
      return acc;
    },
    {}
  );

  const [schedule, setSchedule] = useState(initialSchedule);

  const handleTimeSlotChange = (
    day: string,
    slot: string,
    isChecked: boolean
  ): void => {
    const newSchedule: { [key: string]: string[] } = { ...schedule };
    if (isChecked) {
      newSchedule[day].push(slot);
    } else {
      newSchedule[day] = newSchedule[day].filter((s: string) => s !== slot);
    }
    setSchedule(newSchedule);
  };

  const convertToTime = (slot: string): string => {
    const hour: number = parseInt(slot);
    const startTime: string = `${hour}:00`;
    const endTime: string = `${hour + 1}:00`;
    return `${startTime} - ${endTime}`;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const convertedDates: { day: string; slots: string[] }[] = Object.entries(
      schedule
    ).map(([day, slots]) => {
      const date: Date = new Date(day);
      const timeSlots: string[] = slots.map((slot: string) => {
        return `${slot}:00 to ${
          parseInt(slot) + 1
        }:00 --- ${date.toISOString()} `;
      });
      return { day: date.toDateString(), slots: timeSlots };
    });
    const result = await create_session(convertedDates);
    console.log(result);
    if (!result) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    if (result.error) {
      toast.error(result.error.toString());
      return;
    }

    toast.success("Your session has been created successfully.");
    console.log(result);
  };

  return (
    <div className="w-full py-10">
      <h1 className="text-4xl font-bold">Welcome to Session Scheduler</h1>
      <p>
        Use this page to create and schedule session slots for your sessions.
      </p>
      <div className="w-full py-10">
        <h1 className="text-4xl font-bold">Manage Your Schedule</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(schedule).map((day: string) => (
            <fieldset className={"checkbox-group"} key={day}>
              <legend className="checkbox-group-legend">
                {new Date(day).toDateString()}
              </legend>
              {Array.from({ length: 24 }, (_, i) => i).map((hour: number) => (
                <div className="checkbox" key={hour}>
                  <label
                    className="checkbox-wrapper"
                    htmlFor={`${day}-${hour}`}
                  >
                    <input
                      type="checkbox"
                      id={`${day}-${hour}`}
                      checked={schedule[day].includes(hour.toString())}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleTimeSlotChange(
                          day,
                          hour.toString(),
                          e.target.checked
                        )
                      }
                      className="checkbox-input"
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-label">
                        {convertToTime(hour.toString())}
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </fieldset>
          ))}
          <Button type="submit">Save Schedule</Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
