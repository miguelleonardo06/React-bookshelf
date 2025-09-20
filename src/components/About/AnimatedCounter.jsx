import React, { useState, useEffect } from "react";

export default function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const incrementTime = 16;
    const steps = Math.ceil(duration / incrementTime);
    const increment = (end - start) / steps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(current));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}%</>;
}
