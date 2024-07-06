import React, { useEffect, useRef, useState } from 'react';
import styles from './Background.module.scss';

const Background: React.FC = () => {
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState<string>('');

  const generateRandomBackgroundStyle = () => {
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);

    return `
      linear-gradient(115deg, rgb(var(--light-rgb)), rgb(0, 0, 0)),
      radial-gradient(90% 300% at ${randomX}% ${randomY}%, rgb(var(--light-rgb)), rgb(var(--dark-rgb))),
      radial-gradient(100% 100% at ${randomX}% ${randomY}%, rgb(var(--quinary-rgb)), rgb(var(--quaternary-rgb))),
      radial-gradient(142% 212% at ${randomX}% ${randomY}%, rgb(var(--senary-rgb)), rgb(var(--tertiary-rgb))),
      radial-gradient(100% 100% at ${randomX}% ${randomY}%, rgb(var(--secondary-rgb)), rgb(var(--tertiary-rgb))),
      linear-gradient(192deg, rgb(var(--secondary-rgb)), rgb(var(--tertiary-rgb)))
    `;
  };

  useEffect(() => {
    setBackgroundStyle(generateRandomBackgroundStyle());
    const delay = 2000;
    const timeout = setTimeout(() => {
      setShouldFadeIn(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.background} ${shouldFadeIn ? styles.fadeIn : ''}`} style={{ backgroundImage: backgroundStyle }} >
      
    </div>
  );
};

export default Background;