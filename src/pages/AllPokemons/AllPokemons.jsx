import { useNavigate } from "react-router-dom";
import styles from "./AllPokemons.module.css";
import { useEffect, useState, useMemo } from "react";
import { getAllPokemons } from "../../services/api.js";
import SearchPokemon from "../../components/SearchPokemon/SearchPokemon.jsx";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import FilterPokemon from "../../components/FilterPokemon/FilterPokemon.jsx";
import PokemonGrid from "../../components/PokemonGrid/PokemonGrid.jsx";
import AddEditModal from "../../components/AddEditModal/AddEditModal.jsx";
import { Logout } from "@mui/icons-material";

const AllPokemons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setSelectedPokemon(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getAllPokemons();
      setAllPokemons(data);
    } catch (err) {
      setError(`Échec du chargement des pokemons: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPokemons();
  }, []);

  // Filtrer les Pokémon côté client au lieu de faire des appels API à chaque changement
  const displayedPokemons = useMemo(() => {
    if (!allPokemons) return [];

    return allPokemons.filter((pokemon) => {
      // Filtre par nom (recherche)
      const nameMatches =
        searchTerm === "" ||
        (pokemon.name &&
          (pokemon.name.french
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            pokemon.name.english
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())));

      // Filtre par types
      const typeMatches =
        selectedTypes.length === 0 ||
        selectedTypes.every((type) => pokemon.type.includes(type));

      return nameMatches && typeMatches;
    });
  }, [allPokemons, searchTerm, selectedTypes]);

  const refreshPokemons = async () => {
    await fetchPokemons();
  };

  const onPokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditing(true);
    setIsOpen(true);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header
        className={styles.header}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <SearchPokemon searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>Pokémon</h1>
        <MyButton
          isEditing={false}
          placeholder={"Ajouter"}
          onClick={() => {
            setIsOpen(true);
            setIsEditing(false);
            setSelectedPokemon(null);
          }}
        />
        <FilterPokemon
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
        <MyButton
          placeholder={<Logout />}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "35px",
            height: "35px",
            background: "rgba(255,0,0,0.82)",
          }}
          onClick={handleLogout}
        />
      </header>
      <div className={styles.content}>
        {searchTerm || selectedTypes.length > 0 ? (
          <div className={styles.searchInfo}>
            <p>
              {displayedPokemons.length === 0
                ? "Aucun Pokémon ne correspond à vos critères de recherche."
                : `${displayedPokemons.length} Pokémon trouvé${displayedPokemons.length > 1 ? "s" : ""}.`}
            </p>
            {(searchTerm || selectedTypes.length > 0) && (
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTypes([]);
                }}
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : null}

        {displayedPokemons.length > 0 ? (
          <PokemonGrid
            pokemons={displayedPokemons}
            onPokemonSelect={onPokemonSelect}
          />
        ) : (
          <div className={styles.noResults}>
            <p>Aucun Pokémon trouvé avec ces critères.</p>
          </div>
        )}
      </div>
      <AddEditModal
        pokemon={selectedPokemon}
        isEditing={isEditing}
        isOpen={isOpen}
        handleClose={handleClose}
        refreshPokemons={refreshPokemons}
      />
    </>
  );
};

export default AllPokemons;
