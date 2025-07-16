import { useEffect } from "react";

export default function useShootingStarsCanvas() {
  useEffect(() => {
    let canvas = document.getElementById("shooting-stars-bg");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "shooting-stars-bg";
      canvas.style.position = "fixed";
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.zIndex = "9999";
      canvas.style.pointerEvents = "none";
      document.body.prepend(canvas);
    }
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 100, 100);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);

    let stars = [];
    function spawnStar() {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        len: 200 + Math.random() * 100,
        speed: 8 + Math.random() * 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.02) spawnStar();
      stars.forEach((star) => {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.len,
          star.y - Math.sin(star.angle) * star.len
        );
        ctx.stroke();
        ctx.restore();
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.01;
      });
      stars = stars.filter((star) => star.alpha > 0);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);
} 