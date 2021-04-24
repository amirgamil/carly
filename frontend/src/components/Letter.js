import styles from '../styles/Letter.module.css'

const Letter = ({template, title, content}) => {
    return (
        <div className={`${styles.letterCard} ${template ? styles.template : ""}`}>
            <h1>{title}</h1>
            {content.map((data, index) => {
                return (
                    <>
                        <h2 className={styles.person}>{data.person}</h2> 
                            <div className ={`wrapper block ${styles.bodyLetter}`}>
                                <div className={`wrapper block ${styles.image}`}>
                                    <img className = {`${styles.img}`}src={data.imgAdd} />
                                </div> 
                                <p style= {{ fontSize: "1.5em", whiteSpace: "pre-line", marginTop: "15px"}}>
                                {data.msg}
                                </p>
                        </div>
                    </>
                )
            })}
        </div>
    )
}


export default Letter