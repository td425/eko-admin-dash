import { useEffect, useRef } from "react";

// Arabic letters + Arabic-Indic numerals for the "digital rain" glyphs.
const GLYPHS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوياءأإآؤئ٠١٢٣٤٥٦٧٨٩".split("");

interface MatrixRainProps {
  /** Trail colour (defaults to the EKO orange accent). */
  color?: string;
}

/**
 * Matrix-style digital rain rendered on a transparent canvas. Uses a
 * destination-out fade so the trails stay transparent and let the gradient /
 * cyber-globe behind show through, rather than painting an opaque backdrop.
 */
const MatrixRain = ({ color = "#FF7A1A" }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let maybeCtx: CanvasRenderingContext2D | null;
    try {
      maybeCtx = canvas.getContext("2d");
    } catch {
      maybeCtx = null;
    }
    if (!maybeCtx) return;
    const context = maybeCtx;

    const prefersReduced =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let width = 0;
    let height = 0;

    const setup = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      if (width === 0 || height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.floor((Math.random() * height) / fontSize));
    };

    setup();

    let raf = 0;
    let last = 0;
    const interval = 60; // ms between frames

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < interval) return;
      last = t;

      // Fade existing glyphs toward transparent (keeps the canvas see-through).
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.10)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      context.font = `${fontSize}px "Courier New", monospace`;
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // Bright leading character, with the orange trail behind it.
        context.fillStyle = "rgba(255, 220, 180, 0.95)";
        context.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y);
        context.fillStyle = color;
        context.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
};

export default MatrixRain;
