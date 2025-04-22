import { useRef } from "react";
import styles from "./Booster.module.css";
import boosterImage from "../../assets/boosterPokemon.png";

const Booster = ({ onClick, flipped = false, selected = false }) => {
  const boosterRef = useRef(null);

  return (
    <div
      className={`${styles.boosterContainer} ${flipped ? styles.flipped : ""} ${selected ? styles.selected : ""}`}
      ref={boosterRef}
      onClick={onClick}
    >
      <div className={styles.booster}>
        <div className={styles.front}>
          <img src={boosterImage} alt="Booster" />
        </div>
        <div className={styles.back}>
          <img src={boosterImage} alt="Booster backside" />
        </div>
      </div>
    </div>
  );
};

export default Booster;
