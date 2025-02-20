const FilterPokemon = ({selectedType, setSelectedType}) => {
    const types = [
        "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire",
        "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison",
        "Psychic", "Rock", "Steel", "Water"
    ];

    return (
        <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ padding: '8px' }}
        >
            <option value="">{"Tous les types"}</option>
            {types.map((type) =>(
                <option key={type} value = {type}>{type}</option>
            ))}
        </select>
    );
}

export default FilterPokemon;