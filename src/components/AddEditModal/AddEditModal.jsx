import { useEffect, useState } from "react";
import styles from "./AddEditModal.module.css";
import MyButton from "../UI-components/Button/MyButton.jsx";
import FilterPokemon from "../FilterPokemon/FilterPokemon.jsx";
import {
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../../services/api.js";

const AddEditModal = ({
  isEditing,
  isOpen,
  handleClose,
  pokemon,
  refreshPokemons,
}) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: {
      french: "",
      english: "",
      japanese: "",
      chinese: "",
    },
    type: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      Speed: 0,
    },
  });

  useEffect(() => {
    if (isEditing && pokemon && Object.keys(pokemon).length > 0) {
      setFormData(pokemon);
      setSelectedTypes(pokemon.type || []);
    } else {
      setFormData({
        id: null,
        name: { french: "", english: "", japanese: "", chinese: "" },
        type: [],
        base: {
          HP: 0,
          Attack: 0,
          Defense: 0,
          "Sp. Attack": 0,
          "Sp. Defense": 0,
          Speed: 0,
        },
      });
      setSelectedTypes([]);
    }
  }, [isEditing, pokemon]);

  const handleCloseAndReset = () => {
    setFormData({
      id: null,
      name: { french: "", english: "", japanese: "", chinese: "" },
      type: [],
      base: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        "Sp. Attack": 0,
        "Sp. Defense": 0,
        Speed: 0,
      },
    });
    setSelectedTypes([]);
    handleClose(); // Close the modal
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
      const firstDotIndex = name.indexOf(".");
      const category = name.substring(0, firstDotIndex);
      const key = name.substring(firstDotIndex + 1);
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

  const handleDelete = async () => {
    if (!formData.id) return;

    try {
      await deletePokemon(formData.id);
      await new Promise((resolve) => setTimeout(resolve, 500));

      refreshPokemons();
      handleCloseAndReset();
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      await createPokemon(formData);
    } else {
      await updatePokemon(formData);
    }

    refreshPokemons();
    handleCloseAndReset();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h5>
            {!isEditing
              ? "Ajouter un Pokémon"
              : `Modifier ${formData.name?.french.toLowerCase() || "Pokémon"}`}
          </h5>
          <button className={styles.close} onClick={handleClose}>
            ✖
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <input
              type={"text"}
              name={"name.french"}
              placeholder={"Nom en français"}
              value={formData.name.french}
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
                placeholder={"Supprimer"}
                onClick={handleDelete}
                style={{ backgroundColor: "#d03939" }}
                type={"button"}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
