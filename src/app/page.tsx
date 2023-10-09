"use client";
import React from "react";
import { Stopwatch } from "./components/StopwatchCard";

export default function Home() {
  return (
    <main className="text-center portrait:md:mt-24 mt-10">
      <Stopwatch />
    </main>
  );
}
