import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/pokemons",
})

export const getAllPokemons = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error while fetching pokemons', error);
        throw error;
    }
}

export const getPokemonById = async (id) => {
    try {
        const response = await api.get(`/id/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error while fetching pokemon with id : ${id}`, error);
        throw error;
    }
}

export const createPokemon = async (pokemon) => {
    try{
        const response = await api.post('/', pokemon);
        console.log('Pokemon crée avec succès', response.data);
    }catch (error){
        console.error('Erreur lors de la creation', error);
    }
}

export const updatePokemon = async (id, pokemon) => {
    try{
        const response = await api.get(`/id/${id}`, pokemon);
        console.log('Pokemon modifié avec succès', response.data);
    }catch (error){
        console.error('Erreur lors de la modification', error);
    }
}