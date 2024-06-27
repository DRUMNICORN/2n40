import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Background.module.scss';

interface BackgroundProps {
  animationDisabled?: boolean; // Optional prop to disable animation
}

const Background: React.FC<BackgroundProps> = ({ animationDisabled = true}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const lerpPos = useRef({ x: 0, y: 0 });
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

  // Smoothly interpolate target position at 15 FPS
  useEffect(() => {
    const intervalId = setInterval(() => {
      lerpPos.current = {
        x: lerpPos.current.x + (pos.x - lerpPos.current.x), // Adjust factor for smooth interpolation
        y: lerpPos.current.y + (pos.y - lerpPos.current.y),
      };
      if (cursorStyleRef.current && !animationDisabled) {
        cursorStyleRef.current.style.setProperty('--cursor-x', `${lerpPos.current.x}px`);
        cursorStyleRef.current.style.setProperty('--cursor-y', `${lerpPos.current.y}px`);
      }
    }, 100); // Update approximately every 66.67 milliseconds for 15 FPS

    return () => clearInterval(intervalId);
  }, [pos, animationDisabled]);

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
