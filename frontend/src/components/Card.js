import styles from '../styles/Card.module.css'


const Card = ({data}) => {
    return (
        <div>
            <h2 className={styles.person}>{data.person}</h2> 
            <div className ={`wrapper block ${styles.bodyLetter}`}>
                <div className={`wrapper block ${styles.image}`}>
                    <img className = {`${styles.img}`}src={data.imgAdd} />
                </div> 
                <p className={styles.cardText}>
                {data.msg}
                </p>
            </div>
        </div>
    )
}

export default Card;