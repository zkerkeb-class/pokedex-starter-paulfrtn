import { useNavigate } from "react-router-dom";
import styles from "./AllPokemons.module.css";
import { useEffect, useState, useMemo } from "react";
import {
  getPokemonPage,
  getUnlockedPokemons,
  getAllPokemons,
} from "../../services/api.js";
import SearchPokemon from "../../components/SearchPokemon/SearchPokemon.jsx";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import FilterPokemon from "../../components/FilterPokemon/FilterPokemon.jsx";
import PokemonGrid from "../../components/PokemonGrid/PokemonGrid.jsx";
import AddEditModal from "../../components/AddEditModal/AddEditModal.jsx";
import { Logout } from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { jwtDecode } from "jwt-decode";

const AllPokemons = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

      const token = localStorage.getItem("token");
      let role = null;
      if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
        setIsAdmin(role === "admin");
      }

      if (role === "admin") {
        const { pokemons, totalPages } = await getPokemonPage({
          pageNumber: page,
          ...(searchTerm && { searchTerm }),
          ...(selectedTypes.length > 0 && { types: selectedTypes.join(",") }),
        });

        setAllPokemons(pokemons);
        setPageCount(totalPages);
      } else {
        const pokemons = await getAllPokemons(); // ⬅️ ici tous les pokemons
        setAllPokemons(pokemons);
        setPageCount(1); // pas de pagination nécessaire

        const unlocked = await getUnlockedPokemons();
        const unlockedIds = unlocked.map((p) => p._id);
        setUnlocked(unlockedIds);
      }
    } catch (err) {
      setError(`Échec du chargement des pokemons: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page, searchTerm, selectedTypes]);

  const displayedPokemons = useMemo(() => {
    return allPokemons || [];
  }, [allPokemons]);

  const refreshPokemons = async () => {
    await fetchPokemons();
  };

  const onPokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditing(true);
    setIsOpen(true);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeftSection}>
          <SearchPokemon
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className={styles.headerCenterSection}>
          <h1 className={styles.headerTitle}>Pokédex</h1>
        </div>

        <div className={styles.headerRightSection}>
          <MyButton
            placeholder={isAdmin ? "Ajouter" : "Booster"}
            onClick={() => {
              if (isAdmin) {
                setIsOpen(true);
                setIsEditing(false);
                setSelectedPokemon(null);
              } else {
                navigate("/booster");
              }
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
        </div>
      </header>
      <div className={styles.content}>
        {loading && <div className={styles.loadingIndicator}></div>}

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
                  setPage(1);
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
            unlocked={unlocked}
            isAdmin={isAdmin}
            onPokemonSelect={onPokemonSelect}
          />
        ) : (
          <div className={styles.noResults}>
            <p>Aucun Pokémon trouvé avec ces critères.</p>
          </div>
        )}
        {isAdmin && (
          <div className={styles.pagination}>
            <Pagination page={page} setPage={setPage} pageCount={pageCount} />
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
    </div>
  );
};

export default AllPokemons;
