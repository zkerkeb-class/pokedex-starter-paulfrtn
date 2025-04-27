import styles from "./PokemonCard.module.css";
import { typeColors } from "../../constants/typesColors.js";
import MyButton from "../UI-components/Button/MyButton.jsx";
import { Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Importation des images des types
import bugImg from "../../assets/types/Bug.png";
import darkImg from "../../assets/types/Dark.png";
import dragonImg from "../../assets/types/Dragon.png";
import electricImg from "../../assets/types/Electric.png";
import fairyImg from "../../assets/types/Fairy.png";
import fightingImg from "../../assets/types/Fighting.png";
import fireImg from "../../assets/types/Fire.png";
import flyingImg from "../../assets/types/Flying.png";
import ghostImg from "../../assets/types/Ghost.png";
import grassImg from "../../assets/types/Grass.png";
import groundImg from "../../assets/types/Ground.png";
import iceImg from "../../assets/types/Ice.png";
import normalImg from "../../assets/types/Normal.png";
import poisonImg from "../../assets/types/Poison.png";
import psychicImg from "../../assets/types/Psychic.png";
import rockImg from "../../assets/types/Rock.png";
import steelImg from "../../assets/types/Steel.png";
import waterImg from "../../assets/types/Water.png";

// Dictionnaire des images des types
const typeImages = {
  bug: bugImg,
  dark: darkImg,
  dragon: dragonImg,
  electric: electricImg,
  fairy: fairyImg,
  fighting: fightingImg,
  fire: fireImg,
  flying: flyingImg,
  ghost: ghostImg,
  grass: grassImg,
  ground: groundImg,
  ice: iceImg,
  normal: normalImg,
  poison: poisonImg,
  psychic: psychicImg,
  rock: rockImg,
  steel: steelImg,
  water: waterImg,
};

const PokemonInfo = ({ text, info }) => {
  return (
    <div className={styles.pokemonInfo}>
      <p>{text}</p>
      <p>{info}</p>
    </div>
  );
};

const getRarityShorthand = (rarity) => {
  switch (rarity) {
    case "Common":
      return "C";
    case "Rare":
      return "R";
    case "Ultra Rare":
      return "UR";
    case "Legendary":
      return "L";
    case "Mythic":
      return "M";
    default:
      return "C";
  }
};

const getRarityColor = (rarity) => {
  switch (rarity) {
    case "Common":
      return "#A8A8A8";
    case "Rare":
      return "#3498db";
    case "Ultra Rare":
      return "#9b59b6";
    case "Legendary":
      return "#f1c40f";
    case "Mythic":
      return "#e74c3c";
    default:
      return "#A8A8A8";
  }
};

const PokemonCard = ({ pokemon, onClick, unlocked = true }) => {
  const navigate = useNavigate();

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, type, base, image, _id, rarity, new: isNew = false } = pokemon;
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getBackground = () => {
    if (type.length === 1) {
      return typeColors[type[0]];
    } else {
      return `
            linear-gradient(135deg, 
                ${typeColors[type[0]]} 0%, 
                transparent 40%
            ),
            radial-gradient(circle at 75% 75%, 
                ${typeColors[type[1]]} 0%, 
                ${typeColors[type[0]]} 100%
            )
        `;
    }
  };

  if (!unlocked) {
    return (
      <div className={styles.lockedCard}>
        <div className={styles.lockedOverlay}>
          <p>Non débloqué</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.card}
      style={{
        background: getBackground(),
        backgroundSize: "100% 100%",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick ? () => onClick(pokemon) : undefined}
    >
      {rarity && (
        <div
          className={styles.rarityBadge}
          style={{ backgroundColor: getRarityColor(rarity) }}
        >
          {getRarityShorthand(rarity)}
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.rightHeader}>
          <p>{name.french}</p>
          {isNew && <div className={styles.newBadge}>Nouveau !</div>}
        </div>
        <div className={styles.leftHeader}>
          <p className={styles.PV}>PV</p>
          <p>{base.hp}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.types}>
          {type.map((t, index) => (
            <img key={index} alt={t} src={typeImages[t.toLowerCase()]} />
          ))}
        </div>
        <div className={styles.pokemonImg}>
          <img alt={name.french} width="150px" src={image} />
        </div>
        <div className={styles.textContent}>
          <PokemonInfo text="ATK :" info={base.attack} />
          <PokemonInfo text="DEF :" info={base.defense} />
          <PokemonInfo text="SPE ATK :" info={base.specialAttack} />
          <PokemonInfo text="SPE DEF :" info={base.specialDefense} />
          <PokemonInfo text="SPEED :" info={base.speed} />
        </div>
        <div className={styles.Info}>
          <MyButton
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25px",
              height: "25px",
            }}
            placeholder={
              <Info
                sx={{
                  fontSize: 20,
                }}
              />
            }
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pokemon/${_id}`);
            }}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
