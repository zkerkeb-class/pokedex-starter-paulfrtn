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

export const updatePokemon = async (pokemon) => {
  try {
    await api.put(`/${pokemon.id}`, pokemon);
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

export const searchPokemons = async (searchTerm, types) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (types && types.length > 0) params.append('types', types.join(','));
    
    const response = await api.get(`/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error while searching pokemons", error);
    throw error;
  }
};
