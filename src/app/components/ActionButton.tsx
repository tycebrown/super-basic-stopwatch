"use client";
import React from "react";

export function ActionButton(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="text-xl rounded mx-4 disabled:text-gray-400 bg-gray-500 disabled:bg-gray-600 hover:bg-gray-400 active:bg-gray-300 w-20 md:w-24"
    >
      {props.children}
    </button>
  );
}
