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

export const getNextPokemonId = async () => {
  try {
    // Récupérer tous les Pokémon pour déterminer le prochain ID
    const pokemons = await getAllPokemons();
    if (!pokemons || pokemons.length === 0) {
      return 1; // Si pas de Pokémon, commencer à 1
    }

    // Trouver l'ID le plus élevé
    const maxId = Math.max(...pokemons.map((pokemon) => pokemon.id));
    return maxId + 1; // Retourner le prochain ID disponible
  } catch (error) {
    console.error("Erreur lors de la récupération du prochain ID", error);
    throw error;
  }
};

export const createPokemon = async (pokemon) => {
  try {
    // Si aucun ID n'est fourni, en générer un automatiquement
    if (!pokemon.id) {
      const nextId = await getNextPokemonId();
      pokemon = { ...pokemon, id: nextId };
    }

    const response = await api.post("/", pokemon);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la creation", error);
    throw error;
  }
};

export const updatePokemon = async (pokemon) => {
  try {
    const response = await api.put(`/${pokemon.id}`, pokemon);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification", error);
    throw error;
  }
};

export const deletePokemon = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    throw error;
  }
};

export const searchPokemons = async (searchTerm, types) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (types && types.length > 0) params.append("types", types.join(","));

    const response = await api.get(`/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error while searching pokemons", error);
    throw error;
  }
};
