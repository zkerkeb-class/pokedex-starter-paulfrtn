import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Booster from "../Booster/Booster";
import styles from "./BoosterAnimation.module.css";
import { openBooster } from "../../services/api";
import MyButton from "../UI-components/Button/MyButton.jsx";
import { ArrowBack } from "@mui/icons-material";
import gsap from "gsap";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";

const BoosterAnimation = () => {
  const navigate = useNavigate();
  const [fillSize, setFillSize] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const buttonFillRef = useRef(null);
  const timerRef = useRef(null);
  const hasOpenedRef = useRef(false);
  const maxSize = 150;
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const boosterRef = useRef(null);
  const cardsRefs = useRef([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const messageRef = useRef(null);

  // Réinitialiser les références des cartes lorsque de nouvelles cartes sont chargées
  useEffect(() => {
    if (cards.length > 0) {
      cardsRefs.current = Array(cards.length).fill(null);
    }
  }, [cards]);

  // Assurer que les cartes sont initialement cachées
  useEffect(() => {
    if (isOpened && cardsRefs.current.length > 0 && boosterRef.current) {
      cardsRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, {
            opacity: 0,
            y: 0,
            scale: 0.8,
            x: 0,
            zIndex: -1,
            position: "absolute",
            left: "50%",
            xPercent: -50,
            top: "50%",
            yPercent: -50,
          });
        }
      });
    }
  }, [isOpened]);

  const handleBackToBooster = () => {
    navigate("/booster");
  };

  const handleOpenBooster = async () => {
    if (hasOpenedRef.current) return;

    hasOpenedRef.current = true;
    setIsButtonDisabled(true);
    setIsOpening(true);

    try {
      const cards = await openBooster();
      console.log("Cartes débloquées:", cards);
      setCards(cards);
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

  const handleReturnToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpening && boosterRef.current) {
      const tl = gsap.timeline();

      tl.to(boosterRef.current, {
        rotateY: 1080,
        y: -100,
        duration: 4,
        ease: "power2.inOut",
      }).to(boosterRef.current, {
        y: 0,
        duration: 1,
        ease: "bounce.out",
        onComplete: () => {
          setIsOpened(true);
        },
      });
    }
  }, [isOpening]);

  // Animation des cartes séparée qui se déclenche immédiatement quand isOpened devient true
  useEffect(() => {
    if (isOpened && cards.length > 0 && cardsRefs.current.length > 0) {
      const cardsTl = gsap.timeline({
        onComplete: () => {
          setAnimationCompleted(true);
        },
      });

      cardsTl
        .to(
          cardsRefs.current,
          {
            opacity: 1,
            y: (i) => -250 - i * 20,
            x: 0,
            scale: 1,
            zIndex: 10,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "simultaneAnimation",
        )
        .to(
          boosterRef.current,
          {
            y: 500,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.in",
          },
          "simultaneAnimation",
        )
        .to(
          cardsRefs.current,
          {
            y: 0,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "+=0.1",
        )
        .to({}, { duration: 1 })
        .to(cardsRefs.current, {
          x: (i, el, targets) => {
            const totalWidth = window.innerWidth * 0.7;
            const cardWidth = 120;
            const totalCards = targets.length;

            const spacing =
              ((totalWidth - cardWidth * totalCards) / (totalCards - 1)) * 1.2;

            const startX = -totalWidth / 2 + cardWidth / 2 - 50;

            const invertedIndex = totalCards - 1 - i;
            return startX + invertedIndex * (cardWidth + spacing);
          },
          y: 0,
          scale: 0.9,
          stagger: {
            from: "end",
            each: 0.1,
          },
          duration: 0.8,
          ease: "back.out(1.2)",
          xPercent: 0,
          left: "0%",
        });
    }
  }, [isOpened, cards]);

  useEffect(() => {
    if (animationCompleted && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }
  }, [animationCompleted]);

  return (
    <div
      className={styles.appContainer}
      onClick={animationCompleted ? handleReturnToHome : undefined}
    >
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
          <div className={styles.boosterWrapper} ref={boosterRef}>
            <Booster selected={true} />
          </div>

          {!isOpening && (
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
                Maintenir
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
          )}

          {isOpened && cards.length > 0 && (
            <div className={styles.cardsContainer}>
              <div className={styles.cardsStack}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={styles.cardWrapper}
                    ref={(el) => (cardsRefs.current[index] = el)}
                    style={{ zIndex: cards.length - index }}
                  >
                    <PokemonCard pokemon={card} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {animationCompleted && (
            <div className={styles.returnMessage} ref={messageRef}>
              Cliquez pour retourner au pokedex
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoosterAnimation;
