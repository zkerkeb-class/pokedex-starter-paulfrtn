import { useNavigate } from "react-router-dom";
import styles from "./BoosterOpening.module.css";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import { ArrowBack } from "@mui/icons-material";
import boosterImage from "../../assets/boosterPokemon.png";

const BoosterOpening = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleOpenBooster = async () => {
    navigate("/booster/animation");
  };

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
            onClick={handleBackToHome}
          />
        </div>

        <div className={styles.headerCenterSection}>
          <h1 className={styles.headerTitle}>Ouverture de Booster</h1>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.boosterCard}>
          <div className={styles.boosterImage}>
            <img src={boosterImage} alt="Booster Pokémon" />
          </div>
          <h3>Booster Pokémon</h3>
          <p>5 cartes aléatoires</p>
          <MyButton
            placeholder="Ouvrir"
            onClick={handleOpenBooster}
            style={{
              padding: "10px 25px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BoosterOpening;
