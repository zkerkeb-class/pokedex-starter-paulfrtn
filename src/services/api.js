import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/pokemons",
});

export const getAllPokemons = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error while fetching pokemons", error);
    throw error;
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await api.get(`/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while fetching pokemon with id : ${id}`, error);
    throw error;
  }
};

export const createPokemon = async (pokemon) => {
  try {
    await api.post("/", pokemon);
  } catch (error) {
    console.error("Erreur lors de la creation", error);
  }
};

export const updatePokemon = async (id, pokemon) => {
  try {
    await api.put(`/${id}`, pokemon);
  } catch (error) {
    console.error("Erreur lors de la modification", error);
  }
};

export const deletePokemon = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Erreur lors de la modification", error);
  }
};
