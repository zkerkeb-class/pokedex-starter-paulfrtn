import { useEffect, useState } from "react";
import styles from "./AddEditModal.module.css";
import MyButton from "../UI-components/Button/MyButton.jsx";
import FilterPokemon from "../FilterPokemon/FilterPokemon.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import {
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../../services/api.js";

const initialFormState = {
  id: null,
  name: "",
  type: [],
  base: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
};

const AddEditModal = ({
  isEditing,
  isOpen,
  handleClose,
  pokemon,
  refreshPokemons,
}) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    setError("");
    setDeleteError(false);
  }, [isOpen]);

  useEffect(() => {
    if (isEditing && pokemon && Object.keys(pokemon).length > 0) {
      setFormData({
        ...pokemon,
        name: pokemon.name.french || "",
      });
      setSelectedTypes(pokemon.type || []);
    } else {
      setFormData({ ...initialFormState });
      setSelectedTypes([]);
    }
  }, [isEditing, pokemon]);

  const handleCloseAndReset = () => {
    setFormData({ ...initialFormState });
    setSelectedTypes([]);
    setError("");
    setDeleteError(false);
    handleClose();
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: selectedTypes,
    }));
  }, [selectedTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const categoryIndex = name.indexOf(".");
      const category = name.substring(0, categoryIndex);
      const key = name.substring(categoryIndex + 1);

      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const confirmDelete = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    if (!formData._id && !formData.id) return;

    try {
      const idToDelete = formData._id || formData.id;
      await deletePokemon(idToDelete);
      await new Promise((resolve) => setTimeout(resolve, 500));

      refreshPokemons();
      handleCloseAndReset();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
      setIsConfirmModalOpen(false);

      if (error.response && error.response.status === 403) {
        setDeleteError(true);
        setError(
          "Vous n'avez pas les droits administrateurs permettant d'effectuer cette action",
        );
      } else {
        setError("Une erreur est survenue lors de la suppression du Pokémon");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nameObj =
      typeof formData.name === "string"
        ? {
            french: formData.name,
            english: formData.name,
            japanese: formData.name,
            chinese: formData.name,
          }
        : formData.name;

    const pokemonData = {
      ...formData,
      name: nameObj,
      type:
        formData.type && formData.type.length > 0 ? formData.type : ["normal"],
      base: {
        hp: parseInt(formData.base.hp) || 0,
        attack: parseInt(formData.base.attack) || 0,
        defense: parseInt(formData.base.defense) || 0,
        specialAttack: parseInt(formData.base.specialAttack) || 0,
        specialDefense: parseInt(formData.base.specialDefense) || 0,
        speed: parseInt(formData.base.speed) || 0,
      },
      image: formData.image || "/assets/pokemons/25.png",
    };
    if (formData.id) {
      pokemonData.id = formData.id;
    }

    try {
      if (!formData.id) {
        await createPokemon(pokemonData);
      } else {
        await updatePokemon(pokemonData);
      }
      refreshPokemons();
      handleCloseAndReset();
    } catch (error) {
      console.error("Erreur:", error);

      if (error.response && error.response.status === 403) {
        setDeleteError(true);
        setError(
          "Vous n'avez pas les droits administrateurs permettant d'effectuer cette action",
        );
      } else {
        setError("Une erreur est survenue lors de l'opération");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h5>
              {!isEditing
                ? "Ajouter un Pokémon"
                : `Modifier ${formData.name ? formData.name.toLowerCase() : "Pokémon"}`}
            </h5>
            <button className={styles.close} onClick={handleClose}>
              ✖
            </button>
          </div>

          {error && (
            <div
              className={`${styles.errorMessage} ${deleteError ? styles.deleteError : ""}`}
            >
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formTop}>
              <input
                type="text"
                name="name"
                placeholder="Nom du Pokémon"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.filterContainer}>
              <FilterPokemon
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            </div>

            <div className={styles.formMiddle}>
              <div>
                <input
                  type="number"
                  name="base.hp"
                  placeholder="HP"
                  value={formData.base.hp}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.attack"
                  placeholder="Attaque"
                  value={formData.base.attack}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.defense"
                  placeholder="Défense"
                  value={formData.base.defense}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="base.specialAttack"
                  placeholder="Attaque Spéciale"
                  value={formData.base.specialAttack}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.specialDefense"
                  placeholder="Défense Spéciale"
                  value={formData.base.specialDefense}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.speed"
                  placeholder="Vitesse"
                  value={formData.base.speed}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formBottom}>
              <MyButton
                placeholder={isEditing ? "Modifier" : "Ajouter"}
                onClick={handleSubmit}
                style={{ backgroundColor: "#228B22" }}
              />
              {isEditing && (
                <MyButton
                  placeholder="Supprimer"
                  onClick={confirmDelete}
                  style={{ backgroundColor: "#d03939" }}
                  type="button"
                />
              )}
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        pokemonName={formData.name}
      />
    </>
  );
};

export default AddEditModal;
