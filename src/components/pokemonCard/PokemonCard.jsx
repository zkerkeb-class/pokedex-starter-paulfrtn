import styles from './PokemonCard.module.css'
import type from '../../assets/types/Bug.png'
import PropTypes from "prop-types";


const PokemonInfo = ({text, info}) =>{
    return (
        <div className={styles.pokemonInfo}>
            <p>{text}</p>
            <p>{info}</p>
        </div>
    );
}

PokemonInfo.propTypes = {
    text: PropTypes.string.isRequired,
    info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

const PokemonCard = () => {

    return (
        <div className={styles.container}> {/* TODO : Enlever le container plus tard */}
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.rightHeader}><p>{"Bublizarre"}</p></div>
                    <div className={styles.leftHeader}>
                        <p className={styles.PV}>{"PV"}</p>
                        <p>{"10"}</p>
                        <img alt={"Type"} className={styles.type} src={type}/>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.pokemonImg}></div>
                    <div className={styles.textContent}>
                        <PokemonInfo text={"ATK :"} info={"45"} />
                        <PokemonInfo text={"DEF :"} info={"40"} />
                        <PokemonInfo text={"SPE ATK :"} info={"35"} />
                        <PokemonInfo text={"SPE DEF :"} info={"35"} />
                        <PokemonInfo text={"SPEED :"} info={"56"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;