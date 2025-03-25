import styles from "./PokemonCard.module.css";
import { typeColors } from "../../constants/typesColors.js";

const PokemonInfo = ({ text, info }) => {
  return (
    <div className={styles.pokemonInfo}>
      <p>{text}</p>
      <p>{info}</p>
    </div>
  );
};

const PokemonCard = ({ pokemon, onClick }) => {
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, type, base, image } = pokemon;

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

  return (
    <div
      className={styles.card}
      style={{
        background: getBackground(),
        backgroundSize: "100% 100%",
      }}
      onClick={() => onClick(pokemon)}
    >
      <div className={styles.header}>
        <div className={styles.rightHeader}>
          <p>{name}</p>
        </div>
        <div className={styles.leftHeader}>
          <p className={styles.PV}>PV</p>
          <p>{base.HP}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.types}>
          {type.map((t, index) => (
            <img key={index} alt={t} src={`src/assets/types/${t}.png`} />
          ))}
        </div>
        <div className={styles.pokemonImg}>
          <img alt={name} width="150px" src={image} />
        </div>
        <div className={styles.textContent}>
          <PokemonInfo text="ATK :" info={base.Attack} />
          <PokemonInfo text="DEF :" info={base.Defense} />
          <PokemonInfo text="SPE ATK :" info={base["Sp. Attack"]} />
          <PokemonInfo text="SPE DEF :" info={base["Sp. Defense"]} />
          <PokemonInfo text="SPEED :" info={base.Speed} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
