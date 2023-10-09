"use client";
import React from "react";

export function FormattedTime({
  time,
  hourMinuteSecondFontSize,
  millisecondFontSize,
}) {
  const { hours, minutes, seconds, milliseconds } =
    getFormattedTimeObject(time);
  return (
    // hide the hours text when the screen is too small to hold it,
    // and make the milliseconds smaller than the rest of the time
    <>
      <span
        className={`${hourMinuteSecondFontSize} md:inline hidden`}
      >{`${hours}:`}</span>
      <span
        className={hourMinuteSecondFontSize}
      >{`${minutes}:${seconds}`}</span>
      <span className={millisecondFontSize}>{`.${milliseconds}`}</span>
    </>
  );
}

function getFormattedTimeObject(time) {
  const hours = Math.trunc(time / 1000 / 60 / 60);
  const minutes = Math.trunc((time % (1000 * 60 * 60)) / 1000 / 60);
  const seconds = Math.trunc((time % (1000 * 60)) / 1000);
  const milliseconds = Math.trunc(time % 1000);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    milliseconds: milliseconds.toString().padStart(3, "0"),
  };
}
