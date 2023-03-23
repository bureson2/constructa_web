import styles from "./style.module.scss";
import icon from "../../svg/edit_icon.svg"
function EditButton() {
    return (
        <button className={`${styles.button} ${styles.editButton}`}>
            <img src={icon} alt="Edit Icon" />
        </button>
    );
}

export default EditButton;