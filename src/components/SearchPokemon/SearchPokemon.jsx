const SearchPokemon = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Rechercher un Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
        />
    );
}

export default SearchPokemon;