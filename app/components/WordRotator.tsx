"use client";

import { useState, useEffect } from "react";

const words = ["Copilot", "Agent", "Bot", "Assistant"];

export default function WordRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2500); // Change word every 2.5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block overflow-hidden h-[1.2em] w-[4em] align-bottom ml-2 text-blue-600">
            {words.map((word, i) => (
                <span
                    key={word}
                    className={`absolute left-0 top-0 w-full transition-all duration-500 ease-in-out ${i === index
                            ? "opacity-100 translate-y-0"
                            : i < index
                                ? "opacity-0 -translate-y-full"
                                : "opacity-0 translate-y-full"
                        }`}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}
