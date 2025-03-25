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
    HP: 0,
    Attack: 0,
    Defense: 0,
    "Sp. Attack": 0,
    "Sp. Defense": 0,
    Speed: 0,
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

  useEffect(() => {
    if (isEditing && pokemon && Object.keys(pokemon).length > 0) {
      setFormData({
        ...pokemon,
        name: pokemon.name || "",
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
    if (!formData.id) return;

    try {
      await deletePokemon(formData.id);
      await new Promise((resolve) => setTimeout(resolve, 500));

      refreshPokemons();
      handleCloseAndReset();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pokemonData = {
      ...formData,
      name: {
        french: formData.name,
        english: formData.name,
        japanese: formData.name,
        chinese: formData.name,
      },
      type:
        formData.type && formData.type.length > 0 ? formData.type : ["Normal"],
      base: {
        HP: parseInt(formData.base.HP) || 0,
        Attack: parseInt(formData.base.Attack) || 0,
        Defense: parseInt(formData.base.Defense) || 0,
        "Sp. Attack": parseInt(formData.base["Sp. Attack"]) || 0,
        "Sp. Defense": parseInt(formData.base["Sp. Defense"]) || 0,
        Speed: parseInt(formData.base.Speed) || 0,
      },
      image: formData.image || "/assets/pokemons/25.png",
    };

    try {
      if (!formData.id) {
        await createPokemon(pokemonData);
      } else {
        await updatePokemon(pokemonData);
      }
      refreshPokemons();
      handleCloseAndReset();
    } catch (error) {
      console.error("Error saving Pokémon:", error);
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formTop}>
              <input
                type="text"
                name="name"
                placeholder="Nom du Pokémon"
                value={formData.name}
                onChange={handleChange}
              />
              <FilterPokemon
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            </div>
            <div className={styles.formMiddle}>
              <div>
                <input
                  type="number"
                  name="base.HP"
                  placeholder="HP"
                  value={formData.base.HP}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.Attack"
                  placeholder="Attaque"
                  value={formData.base.Attack}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.Defense"
                  placeholder="Défense"
                  value={formData.base.Defense}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="base.Sp. Attack"
                  placeholder="Attaque Spéciale"
                  value={formData.base["Sp. Attack"]}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.Sp. Defense"
                  placeholder="Défense Spéciale"
                  value={formData.base["Sp. Defense"]}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="base.Speed"
                  placeholder="Vitesse"
                  value={formData.base.Speed}
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
