import { useParams, useNavigate } from "react-router-dom";
import styles from "./PokemonInfo.module.css";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import { useEffect } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";

const PokemonInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.backHeader}>
        <MyButton
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            width: "50px",
            height: "50px",
            borderRadius: "12px",
          }}
          placeholder={<ArrowBackIosNew />}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardInfo}></div>
      </div>
    </div>
  );
};

export default PokemonInfo;
