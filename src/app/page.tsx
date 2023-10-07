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
          <ActionButton enabled={isRunning}>Lap</ActionButton>
          <ActionButton enabled={true} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Stop" : "Run"}
          </ActionButton>
          <ActionButton enabled={!isRunning}>Reset</ActionButton>
        </div>
      </div>
      <Laps laps={laps} />
    </div>
  );
}

function Time({ time, onNewTime, isRunning }) {
  const { hours, seconds, minutes, milliseconds } = formattedTimeObject(time);
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
      <span className="text-8xl">{`${hours}:${minutes}:${seconds}`}</span>
      <span className="text-4xl">{`.${milliseconds}`}</span>
    </div>
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
      disabled={!props.enabled}
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
  return (
    <table className="w-full text-right">
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
              <td>{lap.time}</td>
              <td>{lap.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
