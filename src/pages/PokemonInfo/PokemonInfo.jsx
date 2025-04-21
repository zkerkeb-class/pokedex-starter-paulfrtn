import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PokemonInfo.module.css";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import { useEffect } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { getPokemonById } from "../../services/api.js";

const PokemonInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const selectedPokemon = await getPokemonById(id);
        setPokemon(selectedPokemon);
      } catch (e) {
        console.error("Erreur lors du chargement du pokémon :", e);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPokemon();
  }, [id]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

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
        <h1 className={styles.pageTitle}>Fiche Pokémon</h1>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardInfo}>
          <div className={styles.pokemonHeader}>
            <img
              src={pokemon.image}
              alt={pokemon.name?.french}
              className={styles.pokemonImage}
            />
            <div className={styles.pokemonTitle}>
              <h1>{pokemon.name?.french}</h1>
              <div className={styles.rarityBadge}>
                {pokemon.rarity === "Common" && "Commun"}
                {pokemon.rarity === "Rare" && "Rare"}
                {pokemon.rarity === "Ultra Rare" && "Ultra Rare"}
                {pokemon.rarity === "Legendary" && "Légendaire"}
                {pokemon.rarity === "Mythic" && "Mythique"}
              </div>
              <div className={styles.types}>
                {pokemon.type?.map((type, index) => (
                  <img
                    key={index}
                    alt={type}
                    src={
                      `../src/assets/types/${capitalize(type)}.png`
                    }
                    className={styles.typeImage}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.pokemonDetails}>
            <div className={styles.statsSection}>
              <h2>Statistiques</h2>
              <div className={styles.statsGrid}>
                {Object.entries(pokemon.base || {}).map(([stat, value]) => (
                  <div key={stat} className={styles.statItem}>
                    <span className={styles.statName}>{stat}</span>
                    <span className={styles.statValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.namesSection}>
              <h2>Noms dans différentes langues</h2>
              <div className={styles.namesGrid}>
                {Object.entries(pokemon.name || {})
                  .filter(([lang]) => lang !== "french")
                  .map(([lang, name]) => (
                    <div key={lang} className={styles.nameItem}>
                      <span className={styles.language}>
                        {lang === "english" ? "Anglais" : 
                         lang === "japanese" ? "Japonais" : 
                         lang === "chinese" ? "Chinois" : capitalize(lang)}
                      </span>
                      <span className={styles.name}>{name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
