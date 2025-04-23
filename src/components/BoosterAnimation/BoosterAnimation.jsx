import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Booster from "../Booster/Booster";
import styles from "./BoosterAnimation.module.css";
import { openBooster } from "../../services/api";
import MyButton from "../UI-components/Button/MyButton.jsx";
import { ArrowBack } from "@mui/icons-material";

const BoosterAnimation = () => {
  const navigate = useNavigate();
  const [fillSize, setFillSize] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const buttonFillRef = useRef(null);
  const timerRef = useRef(null);
  const hasOpenedRef = useRef(false);
  const maxSize = 150;

  const handleBackToBooster = () => {
    navigate("/booster");
  };

  const handleOpenBooster = async () => {
    if (hasOpenedRef.current) return;

    hasOpenedRef.current = true;
    setIsButtonDisabled(true);

    try {
      const cards = await openBooster();
      console.log("Cartes débloquées:", cards);
    } catch (error) {
      console.error("Erreur lors de l'ouverture du booster:", error);
      hasOpenedRef.current = false;
      setIsButtonDisabled(false);
    }
  };

  const handleMouseDown = () => {
    if (isButtonDisabled) return;

    setIsHolding(true);
    timerRef.current = setInterval(() => {
      setFillSize((prev) => {
        const newSize = prev + 6;
        if (newSize >= maxSize) {
          clearInterval(timerRef.current);
          handleOpenBooster();
          return maxSize;
        }
        return newSize;
      });
    }, 50);
  };

  const handleMouseUp = () => {
    if (isHolding) {
      clearInterval(timerRef.current);
      setIsHolding(false);
      if (fillSize < maxSize && !isButtonDisabled) {
        setFillSize(0);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeftSection}>
          <MyButton
            placeholder={<ArrowBack />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "35px",
              height: "35px",
            }}
            onClick={handleBackToBooster}
          />
        </div>

        <div className={styles.headerCenterSection}>
          <h1 className={styles.headerTitle}>Animation Booster</h1>
        </div>
      </header>
      
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.boosterWrapper}>
            <Booster selected={true} />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.roundButton} ${isButtonDisabled ? styles.disabled : ""}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              disabled={isButtonDisabled}
            >
              Ouvrir
              <div
                ref={buttonFillRef}
                className={styles.buttonFill}
                style={{
                  width: `${fillSize}px`,
                  height: `${fillSize}px`,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoosterAnimation;
