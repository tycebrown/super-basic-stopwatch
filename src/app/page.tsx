"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  return (
    <main className="text-center mt-36">
      <StopwatchCard />
    </main>
  );
}

function StopwatchCard() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  return (
    <div className="inline-block bg-gray-800 p-14">
      <div className="bg-gray-700 px-4 pb-4 mb-14">
        <Time isRunning={isRunning} time={time} onNewTime={setTime} />

        <div className="text-xl">
          <ActionButton
            disabled={!isRunning}
            onClick={() => {
              setLaps([
                {
                  number: laps.length + 1,
                  time: time - (laps[0] || { total: 0 }).total,
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
      </div>
      <Laps laps={laps} />
    </div>
  );
}

function Time({ time, onNewTime, isRunning }) {
  const [currentInterval, setCurrentInterval] = useState(null);

  if (isRunning && currentInterval === null) {
    var start = Date.now();
    setCurrentInterval(
      setInterval(() => {
        onNewTime(time + Date.now() - start);
      }, 10)
    );
  } else if (!isRunning && currentInterval !== null) {
    clearInterval(currentInterval);
    setCurrentInterval(null);
  }

  return (
    <div className="mb-4">
      <FormattedTime
        time={time}
        hourMinuteSecondFontSize="text-8xl"
        millisecondFontSize="text-4xl"
      />
    </div>
  );
}

function FormattedTime({
  time,
  hourMinuteSecondFontSize,
  millisecondFontSize,
}) {
  const { hours, minutes, seconds, milliseconds } = formattedTimeObject(time);
  return (
    <>
      <span
        className={hourMinuteSecondFontSize}
      >{`${hours}:${minutes}:${seconds}`}</span>
      <span className={millisecondFontSize}>{`.${milliseconds}`}</span>
    </>
  );
}

function formattedTimeObject(time) {
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

function ActionButton(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={
        "rounded mx-4 disabled:text-gray-500 bg-gray-500 disabled:bg-gray-600 hover:bg-gray-400 active:bg-gray-300 w-24"
      }
    >
      {props.children}
    </button>
  );
}

function Laps({ laps }) {
  if (laps.length === 0) {
    return <></>;
  }
  return (
    <table className="w-full text-right text-xl">
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
