import { useState, useEffect } from "react";
import Booster from "../Booster/Booster";
import styles from "./BoosterCarousel.module.css";

const BoosterCarousel = () => {
  const boosters = Array(8).fill(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const angle = 360 / boosters.length;
  const rotateY = -currentIndex * angle;

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % boosters.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + boosters.length) % boosters.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isAnimating, handleNext, handlePrev]);

  return (
    <div className={styles.scene}>
      <div
        className={styles.carousel}
        style={{ transform: `rotateY(${rotateY}deg)` }}
      >
        {boosters.map((_, index) => (
          <div
            key={index}
            className={styles.boosterSlot}
            style={{
              transform: `rotateY(${index * angle}deg) translateZ(250px)`,
            }}
          >
            <Booster selected={index === currentIndex} />
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={handlePrev} disabled={isAnimating}>
          ◀️ Précédent
        </button>
        <button onClick={handleNext} disabled={isAnimating}>
          Suivant ▶️
        </button>
      </div>
    </div>
  );
};

export default BoosterCarousel;
