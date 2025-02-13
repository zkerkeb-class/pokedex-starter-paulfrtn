import styles from './PokemonCard.module.css'

const PokemonInfo = ({text, info}) => {
    return (
        <div className={styles.pokemonInfo}>
            <p>{text}</p>
            <p>{info}</p>
        </div>
    );
}

const PokemonCard = ({pokemon}) => {
    if (!pokemon) {
        return <div>Loading...</div>;
    }

    const {name, type, base, image} = pokemon;
    {type.map((t) => (
        console.log(`../../assets/types/${t}.png`)
    ))}
    return (
        // <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.rightHeader}>
                        <p>{name.french}</p>
                    </div>
                    <div className={styles.leftHeader}>
                        <p className={styles.PV}>PV</p>
                        <p>{base.HP}</p>
                        <div className={styles.types}>
                            {type.map((t, index) => (
                                <img
                                    key={index}
                                    alt={t}
                                    src={`src/assets/types/${t}.png`}
                                />
                                ))}
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.pokemonImg}>
                        <img alt={name.french} width="150px" src={image}/>
                    </div>
                    <div className={styles.textContent}>
                        <PokemonInfo text="ATK :" info={base.Attack}/>
                        <PokemonInfo text="DEF :" info={base.Defense}/>
                        <PokemonInfo text="SPE ATK :" info={base["Sp. Attack"]}/>
                        <PokemonInfo text="SPE DEF :" info={base["Sp. Defense"]}/>
                        <PokemonInfo text="SPEED :" info={base.Speed}/>
                    </div>
                </div>
            </div>
        // </div>
    );
};

export default PokemonCard;
