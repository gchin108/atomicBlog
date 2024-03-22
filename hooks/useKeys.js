"use client";
import { useEffect } from "react";

export function useKeys(key, action) {
  useEffect(() => {
    function callback(e) {
      // if (e.code.toLowerCase() === key.toLowerCase()) {
      if (e.key === key) {
        action();
        e.preventDefault()
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
