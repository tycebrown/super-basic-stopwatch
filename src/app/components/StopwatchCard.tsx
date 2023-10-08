"use client";
import React, { useState } from "react";
import { FormattedTime } from "./FormattedTime";
import { ActionButton } from "./ActionButton";
import { Laps } from "./Laps";

export function StopwatchCard() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [currentInterval, setCurrentInterval] = useState(null);

  if (isRunning && currentInterval === null) {
    var start = Date.now();
    setCurrentInterval(
      setInterval(() => {
        setTime(time + Date.now() - start);
      }, 10)
    );
  } else if (!isRunning && currentInterval !== null) {
    clearInterval(currentInterval);
    setCurrentInterval(null);
  }

  return (
    <div className="inline-block md:bg-gray-800 md:px-10 p-6">
      <div className="md:pb-4">
        <FormattedTime
          time={time}
          hourMinuteSecondFontSize="text-8xl"
          millisecondFontSize="text-4xl"
        />
        <div className="h-4" />
        <ActionButton
          disabled={!isRunning}
          onClick={() => {
            setLaps([
              {
                number: laps.length + 1,
                time: time - laps[0]?.total || 0,
                total: time,
              },
              ...laps,
            ]);
          }}
        >
          Lap
        </ActionButton>
        <ActionButton onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Run"}
        </ActionButton>
        <ActionButton
          disabled={isRunning}
          onClick={() => {
            setTime(0);
            setLaps([]);
          }}
        >
          Reset
        </ActionButton>
      </div>
      <Laps laps={laps} />
    </div>
  );
}
