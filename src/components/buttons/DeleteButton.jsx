import styles from "./style.module.scss";
import icon from "../../svg/delete_icon.svg"
function DeleteButton() {

    return (
        <button className={`${styles.button} ${styles.deleteButton}`}>
            <img src={icon} alt="Delete Icon" />
        </button>
    );
}

export default DeleteButton;