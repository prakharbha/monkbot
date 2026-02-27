"use client";

import { useEffect, useRef, useState } from "react";

// Antigravity style interactive particle field
export default function BackgroundGlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Mouse precise tracking
        let mouse = {
            x: document.documentElement.clientWidth / 2,
            y: window.innerHeight / 2,
            targetX: document.documentElement.clientWidth / 2,
            targetY: window.innerHeight / 2
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Particle system
        interface Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            speed: number;
            color: string;
            angle: number;
            distance: number;
        }

        const particles: Particle[] = [];
        const particleCount = Math.min(document.documentElement.clientWidth / 2, 600); // Dense vortex count

        // Agentic / Tech colors - More white, gray, subtle blue and yellow
        const colors = ["rgba(255, 255, 255, 0.8)", "rgba(220, 230, 255, 0.6)", "rgba(247, 247, 59, 0.5)", "rgba(50, 100, 255, 0.4)", "rgba(100, 100, 100, 0.3)"];

        const maxDistance = Math.max(document.documentElement.clientWidth, window.innerHeight) / 1.2;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                baseX: window.innerWidth / 2,
                baseY: window.innerHeight / 2,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.015 + 0.005,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: Math.random() * Math.PI * 2,
                distance: Math.random() * maxDistance,
            });
        }

        let animationFrameId: number;

        const render = () => {
            // Smooth mouse interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Swirl dynamics: rotate and fall inwards continuously
                p.angle -= p.speed;
                p.distance -= p.speed * 40; // Inward spiraling speed

                // Reset if it reached the center
                if (p.distance < 1) {
                    p.distance = maxDistance;
                    p.angle = Math.random() * Math.PI * 2;
                }

                // Add some noise (wobble)
                const currentDistance = p.distance + Math.sin(p.angle * 5) * 10;

                // Position relative to the mouse (the vortex singularity)
                const targetX = mouse.x + Math.cos(p.angle) * currentDistance;
                const targetY = mouse.y + Math.sin(p.angle) * currentDistance * 0.8; // Ellipsoid perspective 

                // Smoothly move towards the target point
                p.x += (targetX - p.x) * 0.1;
                p.y += (targetY - p.y) * 0.1;

                // Draw particle (dash tracking path)
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle + Math.PI / 2); // Point tangent to the circle

                ctx.beginPath();
                // The closer to the center, the longer the streak
                const streakLength = Math.max(p.size * 2, (maxDistance - currentDistance) * 0.02);
                ctx.moveTo(0, -streakLength);
                ctx.lineTo(0, streakLength);

                ctx.strokeStyle = p.color;

                // Fade out based on distance
                const centerProximity = 1 - Math.min(1, currentDistance / (maxDistance * 0.8));
                ctx.globalAlpha = centerProximity * 0.8 + 0.1;

                ctx.lineWidth = p.size;
                ctx.lineCap = "round";
                ctx.stroke();

                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isClient) return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 mix-blend-multiply"
            aria-hidden="true"
        />
    );
}
