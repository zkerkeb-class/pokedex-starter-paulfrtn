import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/pokemons`,
});

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp - currentTime < 600) {
      const newToken = await refreshToken();
      return newToken;
    }
    return token;
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return null;
  }
};

api.interceptors.request.use(async (config) => {
  await refreshTokenIfNeeded();
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApi.interceptors.request.use(async (config) => {
  if (!config.url.includes("/refresh")) {
    await refreshTokenIfNeeded();
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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
    const pokemons = await getAllPokemons();
    if (!pokemons || pokemons.length === 0) {
      return 1;
    }

    const maxId = Math.max(...pokemons.map((pokemon) => pokemon.id));
    return maxId + 1;
  } catch (error) {
    console.error("Erreur lors de la récupération du prochain ID", error);
    throw error;
  }
};

export const getPokemonPage = async (params) => {
  try {
    let response;

    if (params.searchTerm || params.types) {
      response = await api.get("/search", { params });
    } else {
      response = await api.get(`page/${params.pageNumber}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des pokemons`, error);
    throw error;
  }
};

export const createPokemon = async (pokemon) => {
  try {
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
    const response = await api.put(`/id/${pokemon._id}`, pokemon);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification", error);
    throw error;
  }
};

export const deletePokemon = async (id) => {
  try {
    const response = await api.delete(`/id/${id}`);
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

export const refreshToken = async () => {
  try {
    const response = await authApi.post("/refresh");
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    throw error;
  }
};

export const login = async ({ mail, password }) => {
  try {
    const res = await authApi.post("/login", { mail, password });
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (e) {
    console.error("Erreur de connexion", e);
    throw e;
  }
};

export const register = async ({ firstname, lastname, mail, password }) => {
  try {
    const res = await authApi.post("/register", {
      firstname,
      lastname,
      mail,
      password,
    });
    return res.data;
  } catch (e) {
    console.error("Erreurr d'inscription", e);
    throw e;
  }
};

export const openBooster = async () => {
  try {
    const res = await api.get("/booster");
    return res.data.booster;
  } catch (e) {
    console.error("Erreur lors de l'ouverture du booster", e);
    throw e;
  }
};

export const getUnlockedPokemons = async () => {
  try {
    const { data } = await api.get("/unlocked");
    return data.pokemons;
  } catch (e) {
    console.error("Erreur lors de la récupération des Pokémon débloqués", e);
    throw e;
  }
};
