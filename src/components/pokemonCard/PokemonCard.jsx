import styles from './PokemonCard.module.css'

const PokemonCard = () => {

    return (
        <div className={styles.container}> {/* TODO : Enlever le container plus tard */}
            <div className={styles.card}>
                <div className={styles.header}>
                    <p>Bublizarre</p>
                </div>
                <div className={styles.header2}></div>
            </div>
        </div>
    );
}

export default PokemonCard;