import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Background.module.scss';

interface BackgroundProps {
  animationDisabled?: boolean; // Optional prop to disable animation
}

const Background: React.FC<BackgroundProps> = ({ animationDisabled = true }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const lerpPos = useRef({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const cursorStyleRef = useRef<HTMLDivElement>(null);

  // Handle pointer move to update position
  const handlePointerMove = useCallback((e: PointerEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    document.body.addEventListener('pointermove', handlePointerMove);
    return () => document.body.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  // Smoothly interpolate target position once per second
  useEffect(() => {
    const intervalId = setInterval(() => {
      lerpPos.current = {
        x: lerpPos.current.x + (pos.x - lerpPos.current.x) * 0.1,
        y: lerpPos.current.y + (pos.y - lerpPos.current.y) * 0.1,
      };
      if (cursorStyleRef.current && !animationDisabled) {
        cursorStyleRef.current.style.setProperty('--cursor-x', `${lerpPos.current.x}px`);
        cursorStyleRef.current.style.setProperty('--cursor-y', `${lerpPos.current.y}px`);
      }
    }, 1000); // Update once per second

    return () => clearInterval(intervalId);
  }, [pos, animationDisabled]);

  // Calculate FPS using requestAnimationFrame
  useEffect(() => {
    let frameCount = 0;
    let lastLoop = performance.now();
    const loop = () => {
      const now = performance.now();
      const delta = now - lastLoop;
      frameCount++;
      if (delta >= 1000) {
        setFps(Math.round(1000 / (delta / frameCount)));
        frameCount = 0;
        lastLoop = now;
      }
      requestAnimationFrame(loop);
    };
    loop();
  }, []);

  // Simulate loading and fade in effect
  useEffect(() => {
    const delay = 2000;
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      setShouldFadeIn(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.background} ${shouldFadeIn ? styles.fadeIn : ''}`} ref={cursorStyleRef}>
      {/* Uncomment to show disabled animation message */}
      {/* {animationDisabled && (
        <div className={styles.disabled}>Your hardware is struggling. Animation is disabled.</div>
      )}  */}
    </div>
  );
};

export default Background;
