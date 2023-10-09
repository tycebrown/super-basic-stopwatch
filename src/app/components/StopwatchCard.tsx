"use client";
import React, { createContext, useContext, useState } from "react";
import { FormattedTime } from "./FormattedTime";
import { ActionButton } from "./ActionButton";
import { Laps } from "./Laps";

const TickerContext = createContext(null);

export function Stopwatch() {
  return (
    <StopwatchTickerProvider>
      <StopwatchCard />
    </StopwatchTickerProvider>
  );
}

function StopwatchTickerProvider(props) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentUpdateInterval, setCurrentUpdateInterval] = useState(null);

  if (isRunning && currentUpdateInterval === null) {
    var start = Date.now();
    setCurrentUpdateInterval(
      setInterval(() => {
        setTime(time + Date.now() - start);
      }, 10)
    );
  } else if (!isRunning && currentUpdateInterval !== null) {
    clearInterval(currentUpdateInterval);
    setCurrentUpdateInterval(null);
  }

  const ticker = {
    state: { time, isRunning },
    actions: { setTime, setIsRunning },
  };

  return (
    <TickerContext.Provider value={ticker}>
      {props.children}
    </TickerContext.Provider>
  );
}

function StopwatchCard() {
  const [laps, setLaps] = useState([]);
  const {
    state: { isRunning, time },
    actions: { setIsRunning, setTime },
  } = useContext(TickerContext);

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
                time: time - (laps[0]?.total || 0),
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
