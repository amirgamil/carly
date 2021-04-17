import styles from '../styles/Popup.module.css'

const PopUp = ({url, toggle}) => {
    return (
        <div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span className="close" onClick={() => toggle(false)}>&times;    </span>
                    <p>Congratulations! Your letter is live <a href={url}>{url}</a></p>
                    <button>
                        Share it
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUp