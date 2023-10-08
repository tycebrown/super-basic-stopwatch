"use client";
import React from "react";
import { FormattedTime } from "./FormattedTime";

export function Laps({ laps }) {
  if (laps.length === 0) {
    return <></>;
  }

  return (
    <table className="w-full text-right text-xl mt-14">
      <thead>
        <tr>
          <th className="text-left">Lap #</th>
          <th>Time</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {laps.map((lap) => {
          return (
            <tr key={lap.number}>
              <td className="text-left">{lap.number}</td>
              <td>
                <FormattedTime
                  time={lap.time}
                  hourMinuteSecondFontSize="text-xl"
                  millisecondFontSize="text-base"
                />
              </td>
              <td>
                <FormattedTime
                  time={lap.total}
                  hourMinuteSecondFontSize="text-xl"
                  millisecondFontSize="text-base"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
