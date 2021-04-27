import styles from '../styles/Letter.module.css'
import Card from './Card'

const Letter = ({template, title, content}) => {
    return (
        <div className={`${styles.letterCard} ${template ? styles.template : ""}`}>
            <h1 style={{fontSize: "2.5em"}}>{title}</h1>
            {content.map((data, index) => {
                return (
                    <Card key={"card" + index} data={data} />
                )
            })}
        </div>
    )
}


export default Letter