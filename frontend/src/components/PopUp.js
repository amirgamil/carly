import styles from '../styles/PopUp.module.css'

const PopUp = ({url, toggle}) => {

    function copy(evt) {
        let element = document.getElementById("url");
        navigator.clipboard.writeText(element.value);
    }

    return (
        <div className={styles.modal}>
            <div className={`block wrapper ${styles.modalContent}`}>
                <h3 style={{paddingBottom: "10px"}}>card created!</h3>
                <label className="urlLabel">
                    <div style={{marginBottom: "10px"}}>
                        <span>url</span>
                    </div>
                    <input id="url" name="url" disabled readOnly value={url} type="text"/>
                </label>
                <div style={{marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <button className="block" onClick={copy}>
                        Copy
                    </button>
                    <button className="block" onClick={() => window.location.href=url}>
                        Go to url
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default PopUp