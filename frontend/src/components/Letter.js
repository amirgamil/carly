import styles from '../styles/Letter.module.css'

const Letter = (props) => {
    return (
        <div className={`${styles.letterCard} ${props.template ? styles.template : ""}`}>
            <h1>{props.data.title}</h1>
            <h2 className={styles.person}>{props.data.person}</h2> 
            <div className ={`wrapper block ${styles.bodyLetter}`}>
                <div className={`wrapper block ${styles.image}`}>
                    <img className = {`${styles.img}`}src={props.data.image} />
                </div> 
                <p style= {{ fontSize: "1.5em", whiteSpace: "pre-line", marginTop: "15px"}}>
                  {props.data.message}
                </p>
            </div>
        </div>
    )
}


export default Letter