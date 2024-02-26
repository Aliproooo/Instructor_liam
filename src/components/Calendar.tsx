"use client";
import React, { useState } from "react";

const calendarData = [
  {
    day: "Mon Feb 05 2024",
    slots: [
      "21:00 to 22:00 --- 2024-02-05T09:45:58.339Z ",
      "22:00 to 23:00 --- 2024-02-05T09:45:58.339Z ",
      "23:00 to 24:00 --- 2024-02-05T09:45:58.339Z ",
    ],
  },
  {
    day: "Tue Feb 06 2024",
    slots: [
      "17:00 to 18:00 --- 2024-02-06T09:45:58.339Z ",
      "18:00 to 19:00 --- 2024-02-06T09:45:58.339Z ",
      "19:00 to 20:00 --- 2024-02-06T09:45:58.339Z ",
    ],
  },
  {
    day: "Wed Feb 07 2024",
    slots: [
      "17:00 to 18:00 --- 2024-02-07T09:45:58.339Z ",
      "16:00 to 17:00 --- 2024-02-07T09:45:58.339Z ",
      "15:00 to 16:00 --- 2024-02-07T09:45:58.339Z ",
      "14:00 to 15:00 --- 2024-02-07T09:45:58.339Z ",
    ],
  },
  {
    day: "Thu Feb 08 2024",
    slots: [
      "10:00 to 11:00 --- 2024-02-08T09:45:58.339Z ",
      "14:00 to 15:00 --- 2024-02-08T09:45:58.339Z ",
      "11:00 to 12:00 --- 2024-02-08T09:45:58.339Z ",
      "15:00 to 16:00 --- 2024-02-08T09:45:58.339Z ",
    ],
  },
  {
    day: "Fri Feb 09 2024",
    slots: [
      "11:00 to 12:00 --- 2024-02-09T09:45:58.339Z ",
      "15:00 to 16:00 --- 2024-02-09T09:45:58.339Z ",
      "10:00 to 11:00 --- 2024-02-09T09:45:58.339Z ",
      "14:00 to 15:00 --- 2024-02-09T09:45:58.339Z ",
    ],
  },
  {
    day: "Sat Feb 10 2024",
    slots: [
      "6:00 to 7:00 --- 2024-02-10T09:45:58.339Z ",
      "7:00 to 8:00 --- 2024-02-10T09:45:58.339Z ",
      "10:00 to 11:00 --- 2024-02-10T09:45:58.339Z ",
      "11:00 to 12:00 --- 2024-02-10T09:45:58.339Z ",
    ],
  },
  {
    day: "Sun Feb 11 2024",
    slots: [
      "10:00 to 11:00 --- 2024-02-11T09:45:58.339Z ",
      "11:00 to 12:00 --- 2024-02-11T09:45:58.339Z ",
      "9:00 to 10:00 --- 2024-02-11T09:45:58.339Z ",
      "13:00 to 14:00 --- 2024-02-11T09:45:58.339Z ",
    ],
  },
];

function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);

  //@ts-ignore
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };
  //@ts-ignore

  const handleSlotChange = (event) => {
    const newSelectedSlots = [...selectedSlots];
    if (event.target.checked) {
      //@ts-ignore

      newSelectedSlots.push(event.target.value);
    } else {
      //@ts-ignore

      const index = newSelectedSlots.indexOf(event.target.value);
      newSelectedSlots.splice(index, 1);
    }
    setSelectedSlots(newSelectedSlots);
  };

  const dayData = calendarData.find((data) => data.day === selectedDay);

  return (
    <div>
      <select
        //@ts-ignore
        value={selectedDay}
        onChange={handleDayChange}
      >
        <option value="">Select a day</option>
        {calendarData.map((data) => (
          <option key={data.day} value={data.day}>
            {data.day}
          </option>
        ))}
      </select>
      {dayData && (
        <div>
          {dayData.slots.map((slot) => (
            <div key={slot}>
              <input
                type="checkbox"
                value={slot}
                //@ts-ignore

                checked={selectedSlots.includes(slot)}
                onChange={handleSlotChange}
              />
              <label>{slot}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
